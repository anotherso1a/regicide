import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import { isSamePropertyValue, shuffle } from "@/ts/util";
import { Card } from "@/ts/card";
import { CateList, PlayerCountMap, TavernList } from "@/ts/const";

/**
 * 获取城堡boss排列
 */
const getCastleDeck = () => [
  ...shuffle(CateList.map((cate) => new Card(13, cate))), // K
  ...shuffle(CateList.map((cate) => new Card(12, cate))), // Q
  ...shuffle(CateList.map((cate) => new Card(11, cate))), // J
];

/**
 * 获取酒馆牌组的方法
 * @param {Number} playerCount 游玩人数
 * @returns 酒馆牌组
 */
const getTavernDeck = (playerCount: keyof typeof PlayerCountMap = 1) => {
  // A-10，四种花色
  const normalDeck = TavernList.map((n) =>
    CateList.map((cate) => new Card(n, cate))
  ).flat();
  const joker = Array.from({ length: PlayerCountMap[playerCount].joker }).map(
    () => new Card(0, 1)
  );
  return shuffle([...normalDeck, ...joker]);
};

const resetGame = () => {
  const castle = getCastleDeck()
  const currentBoss = castle.pop()
  return reactive({
    castle, // 城堡牌
    deck: getTavernDeck(1), // 酒馆牌
    currentBoss,
    myHand: [] as Card[], // 手牌
    playArea: [] as Card[], // 打牌区
    discard: [] as Card[], // 弃牌堆
    maxHandCard: PlayerCountMap[1].max
  })
}



export const useSingleStore = defineStore("single", () => {
  const status = ref<'using' | 'fail' | 'success' | 'discarding'>('using')
  const bossAtk = ref(0)
  const tipText = ref('你必须打牌')
  const loggers: string[] = reactive([])
  const joker = ref(2) // 鬼牌数量
  let {
    castle,
    deck,
    myHand,
    playArea,
    discard,
    maxHandCard,
    currentBoss } = resetGame()
  function newGame() {
    let initData = resetGame()
    castle.splice(0, Infinity, ...initData.castle)
    deck.splice(0, Infinity, ...initData.deck)
    myHand.splice(0, Infinity)
    playArea.splice(0, Infinity)
    discard.splice(0, Infinity)
    maxHandCard = initData.maxHandCard
    Object.assign(currentBoss!, initData.currentBoss)
    status.value = 'using'
    bossAtk.value = 0
    tipText.value = '你必须打牌'
    loggers.splice(0, Infinity)
    joker.value = 2
    getCard(maxHandCard)
  }

  function getCard(n: number) {
    const maxCardNum = maxHandCard - myHand.length; // 最多能抽的牌的数量
    if (n > maxCardNum) n = maxCardNum; // 如果需要抽的牌超出最多能抽的牌的数量，则改为抽牌至上限
    loggers.unshift(`> 从酒馆抽取了 ${n} 张牌`)
    while (n--) {
      const card = deck.pop();
      if (!card) break; // 牌被抽完则直接终止
      myHand.push(card);
    }
  }
  /** 检查出牌是否合理 */
  function checkCardValid(cards: Card[]) {
    if (!cards.length) {
      tipText.value = '出牌不能为空'
      return false
    }
    // 检查出牌是否合规
    if (cards.length > 1) {
      // 多张牌才有可能不合规
      // 1.带A，也就是带宠物，带宠物出牌只能出2张
      if (cards.find((e) => e.number === 1)) {
        const valid = cards.length <= 2
        !valid && (tipText.value = '出牌有误，携带宠物（A）时，最多额外打出一张牌')
        return valid;
      }
      // 2.同大小牌，需要检查牌是否都一样，且合小于等于10
      if (
        !isSamePropertyValue(cards, "number") ||
        cards.reduce((c, v) => c + v.atk, 0) > 10
      ) {
        tipText.value = '出牌有误，多张牌一起出时，只能点数相同，且总和应小于等于10'
        return false;
      }
    }
    return true;
  }
  /** 请求出牌 */
  function useCard(idxs: number[]) {
    const cards = idxs.map(i => myHand[i]).filter(e => !!e)
    const isValid = checkCardValid(cards)
    if (!isValid) {
      return
    }
    deleteCard(myHand, idxs)
    playArea.push(...cards) // 放入打牌区
    return cards
  }
  /** 触发卡牌 */
  function triggerCards(cards: Card[]) {
    // 一定是符合条件的卡牌
    cards.sort((a, b) => a.cate - b.cate); // 排下序，因为先触发红桃，再触发方片
    const sum = cards.reduce((c, v) => c + v.atk, 0);
    const boss = currentBoss!;
    cards.forEach((c) => {
      // 处理卡牌效果
      if (c.cate === boss.cate) {
        loggers.unshift(`> Boss 免疫了 ${c.cateIcon} 的效果`);
        return; // boss免疫自身花色牌的效果，所以当花色和boss相同，则直接return
      }
      switch (c.cate) {
        case 1: // 黑桃降低boss攻击力
          boss.atk -= sum;
          loggers.unshift(`> 降低了 Boss ${sum} 点攻击力`);
          break;
        case 2: // 红桃回归勇士
          shuffle(discard); // 弃牌区洗牌
          const recoverCards = discard.splice(0, sum); // 从弃牌区拿起sum张牌
          deck.push(...recoverCards); // 插入酒馆牌中
          shuffle(deck); // 洗牌
          loggers.unshift(
            `> 从弃牌堆中随机抽取了 ${recoverCards.length} 张卡牌放回酒馆`
          );
          break;
        case 3: // 草花双倍攻击，可以理解为触发技能的时候直接造成一次伤害，后续结算再次造成一次伤害
          // 所以这里直接触发一次伤害
          boss.hp -= sum;
          loggers.unshift(`> ♣️效果对 Boss 造成了 ${sum} 点伤害`);
          break;
        case 4: // 方片抽牌
          getCard(sum); // 直接调用抽牌方法，抽对应数量的牌即可
          break;
      }
    });
    // 处理卡牌伤害
    boss.hp -= sum;
    loggers.unshift(`> 对 Boss 造成 ${sum} 点伤害`);
  }
  function bossTurn() {
    const boss = currentBoss!;
    // 先检查boss是否存活
    if (boss.hp <= 0) {
      // 死了
      //这里重新生成卡牌，因为boss的血量，攻击可能都被削减过
      const bossCard = new Card(boss.number, boss.cate);
      if (boss.hp === 0) {
        loggers.unshift(`> 精准伤害！成功规劝了 Boss ${boss.display()}`);
        deck.push(bossCard); // 规劝成功，直接放回酒馆牌
        shuffle(deck); // 洗牌
      } else {
        loggers.unshift(`> 击败了 Boss ${boss.display()}`);
        discard.push(bossCard); // 直接打死了就放进弃牌区，只有回归牌组才有可能被使用
      }
      // 将打牌区的牌也放入弃牌区
      discard.push(...playArea);
      playArea.splice(0, 10); // 重置打牌区
      // 派出下一个boss
      const nextBoss = castle.pop();
      if (!nextBoss) {
        const prize = joker.value === 2 ? '金牌' : joker.value === 1 ? '银牌' : ''
        tipText.value = `恭喜你击败了所有boss，游戏${prize}通关`
        loggers.unshift(`剩余${joker.value}张joker，${prize}通关游戏`)
        return status.value = 'success'
      }
      Object.assign(boss, nextBoss)
      loggers.unshift(`城堡派出了新的 Boss ${boss.display()}`);
      return status.value = 'using' // 继续出牌
    } else {
      //boss若仍然存活，则发起攻击
      const atk = boss.atk;
      if (atk > 0) {
        // 提前判断一下手牌是否够抵御伤害，不够则直接判负
        const all = myHand.reduce((c, v) => c + v.atk, 0)
        if (all < atk) {
          loggers.unshift(`手牌不足以抵御攻击，游戏失败`)
          tipText.value = '手牌不足以抵御攻击，游戏失败'
          return status.value = 'fail' // 游戏失败
        }
        // 玩家丢弃对应点数的手牌用以抵御攻击
        loggers.unshift(`受到boss ${atk} 点攻击`)
        tipText.value = `受到boss ${atk} 点攻击，请丢弃总和 ${atk} 以上的卡牌`
        bossAtk.value = atk
        return status.value = 'discarding' // 等待丢牌
      }
      tipText.value = `你必须打牌`
      return status.value = 'using' // 攻击力小于0，则不用丢牌，继续进入使用阶段
    }
  }
  /** 删除卡片 */
  function deleteCard(cards: Card[], idxs: number[]) {
    const descIdxs = [...idxs].sort((a, b) => b - a)
    descIdxs.forEach(i => cards.splice(i, 1)) // 逆序删除数组中内容
  }
  /** 丢弃手牌 */
  function handlerDiscardCards(idxs: number[]) {
    const cards = idxs.map(i => myHand[i]).filter(e => !!e)
    if (cards.reduce((c, v) => c + v.atk, 0) < bossAtk.value) {
      tipText.value = '不足以抵御此次攻击，请重新出牌'
      return
    }
    bossAtk.value = 0 // 重置伤害
    loggers.unshift(`> 丢弃 ${cards.map(c => c.display()).join('、')}，成功抵御 ${bossAtk.value} 点伤害`)
    deleteCard(myHand, idxs)
    discard.push(...cards) // 放入弃牌堆
    tipText.value = `你必须打牌`
    return status.value = 'using' // 丢牌成功，设置状态至出牌阶段
  }
  // 外部使用的api
  function handlerUseCard(idxs: number[]) {
    const cards = useCard(idxs)
    if (!cards) return // 不符合出牌条件
    triggerCards(cards) // 触发技能
    bossTurn(); // boss回合
  }
  function handlerResetHandCard() {
    discard.push(...myHand)
    myHand.splice(0, 8)
    getCard(8)
  }

  // 初始流程
  newGame()
  return {
    castle,
    deck,
    myHand,
    playArea,
    discard,
    maxHandCard: ref(maxHandCard),
    currentBoss,
    joker,
    loggers,
    status,
    tipText,
    newGame,
    handlerDiscardCards, // 弃牌
    handlerResetHandCard,
    handlerUseCard // 用牌
  }
});
