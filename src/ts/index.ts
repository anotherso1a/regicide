// import { Card } from "./card";
// import { CateList, PlayerCountMap, TavernList } from "./const";
// import { isSamePropertyValue, shuffle } from "./util";

// //! 摸牌统一使用 pop 方法
// /**
//  * 获取城堡boss排列
//  */
// const getCastleDeck = () => [
//   ...shuffle(CateList.map((cate) => new Card(13, cate))), // K
//   ...shuffle(CateList.map((cate) => new Card(12, cate))), // Q
//   ...shuffle(CateList.map((cate) => new Card(11, cate))), // J
// ];

// /**
//  * 获取酒馆牌组的方法
//  * @param {Number} playerCount 游玩人数
//  * @returns 酒馆牌组
//  */
// const getTavernDeck = (playerCount: keyof typeof PlayerCountMap = 1) => {
//   // A-10，四种花色
//   const normalDeck = TavernList.map((n) =>
//     CateList.map((cate) => new Card(n, cate))
//   ).flat();
//   const joker = Array.from({ length: PlayerCountMap[playerCount].joker }).map(
//     () => new Card(0, 1)
//   );
//   return shuffle([...normalDeck, ...joker]);
// };

// class RegicideSingle {
//   // 单人游戏
//   castle = getCastleDeck(); // 城堡牌
//   deck = getTavernDeck(1); // 酒馆牌
//   currentBoss?: Card;
//   myHand: Card[] = []; // 手牌
//   playArea: Card[] = []; // 打牌区
//   discard: Card[] = []; // 弃牌堆
//   maxHandCard = PlayerCountMap[1].max;
//   constructor() {
//     this.init(); // 初始化
//   }
//   init() {
//     this.currentBoss = this.castle.pop();
//     this.getCard(this.maxHandCard); // 抽牌至手牌上限
//     this.helpPlugin();
//     this.mainPhase();
//   }
//   getCard(n: number) {
//     const maxCardNum = this.maxHandCard - this.myHand.length; // 最多能抽的牌的数量
//     if (n > maxCardNum) n = maxCardNum; // 如果需要抽的牌超出最多能抽的牌的数量，则改为抽牌至上限
//     console.log(`> 从酒馆抽取了 ${n} 张牌`);
//     while (n--) {
//       const card = this.deck.pop();
//       if (!card) break; // 牌被抽完则直接终止
//       this.myHand.push(card);
//     }
//   }
//   display() {
//     console.log(`
// ====== 当前BOSS：${this.currentBoss?.display()} ======
// 攻击力：${this.currentBoss?.atk}
// 剩余血量：${this.currentBoss?.hp}
// 免疫所有 ${this.currentBoss?.cateIcon} 卡牌的效果
// ====== 打牌区 ======
// ${this.playArea.map((c) => c.display()).join(" ")}
// ====== 弃牌堆 ======
// 弃牌数量：${this.discard.length}
// ====== 酒馆 ======
// 酒馆剩余战士：${this.deck.length}
// ====== 我的手牌 ======
// ${this.myHand.map((c, i) => `[${i}.${c.display()}]`).join(" ")}
// `);
//   }
//   /**
//    * 主要流程
//    */
//   async mainPhase() {
//     this.display(); // 展示基本信息
//     const cards = await this.requireCard(); // 出牌
//     console.log(`> 玩家打出了 ${cards.map((c) => c.display()).join("、")}`);
//     this.triggerCards(cards); // 触发卡牌技能
//     const { status } = await this.bossTurn();
//     switch (status) {
//       case "success":
//         console.log("恭喜你，成功通关，击败了所有boss");
//         break;
//       case "fail":
//         console.log("很遗憾，无法抵御这次攻击，你被击败了");
//         break;
//       case "continue":
//         this.mainPhase(); // 继续执行流程
//         break;
//     }
//   }
//   /** 检查出牌是否合理 */
//   checkCardValid(cards: Card[]) {
//     // 检查出牌是否合规
//     if (cards.length > 1) {
//       // 多张牌才有可能不合规
//       // 1.带A，也就是带宠物，带宠物出牌只能出2张
//       if (cards.find((e) => e.number === 1)) return cards.length <= 2; // 出牌错误，要求重新出牌
//       // 2.同大小牌，需要检查牌是否都一样，且合小于等于10
//       if (
//         !isSamePropertyValue(cards, "number") ||
//         cards.reduce((c, v) => c + v.atk, 0) > 10
//       )
//         return false;
//     }
//     return true;
//   }
//   /** 帮助插件 */
//   helpPlugin() {
//     console.log(`
// 欢迎游玩「弑君者 - REGICIDE」游戏，游戏规则见README，以下是技能简介：
// `);
//     console.log(`
// 红桃 -从弃牌堆恢复：洗混弃牌堆，然后面朝下抽出该卡片数值相同数量的卡牌。把它们放到酒馆牌堆底，然后将弃牌堆正面朝上放回桌面。

// 方片 - 抽卡：当前玩家抽一张卡，然后按照顺时针方向，每人一次抽一张牌，直到所有人抽牌数量之和等于该打出的卡牌的数值。达到手牌上线的玩家不能抽牌，而是直接跳过，玩家永远不能拥有超过手牌上限的牌。当你试图从空的酒馆牌堆中抽牌时，游戏并不会失败。

// 草花 - 双倍伤害：在阶段三，草花牌造成的伤害是卡牌数值的双倍。

// 黑桃 - 抵挡敌人的伤害：在阶段四，减少敌人的伤害，减少的数值与该卡牌的数值相等。抵挡的效果是所有玩家打出黑桃牌的总和，抵挡的效果会一直持续，直到当前敌人被击败。
// `);
//   }
//   /** 请求出牌 */
//   async requireCard() {
//     // 请求出牌
//     const userChoose = await requireInput('请输入需要出的牌的序号，从0开始，多张牌请使用空格隔开:\n>>> ')
//     const idxs = userChoose.trim().split(/\s+/).map(e => Number(e))
//     const cards = idxs.map(i => this.myHand[i]).filter(e => !!e)
//     const isValid = this.checkCardValid(cards)
//     if (!isValid) {
//       console.log('出牌有误，携带宠物（A）时，最多额外打出一张牌，多张牌一起出时，只能点数相同，且总和应小于等于10')
//       return await this.requireCard()
//     }
//     idxs.forEach(i => this.myHand[i] = undefined) // 删除手牌
//     this.myHand = this.myHand.filter(c => !!c) // 过滤手牌
//     this.playArea.push(...cards) // 放入打牌区
//     return cards
//   }
//   /** 触发卡牌 */
//   triggerCards(cards: Card[]) {
//     // 一定是符合条件的卡牌
//     cards.sort((a, b) => a.cate - b.cate); // 排下序，因为先触发红桃，再触发方片
//     const sum = cards.reduce((c, v) => c + v.atk, 0);
//     const boss = this.currentBoss!;
//     cards.forEach((c) => {
//       // 处理卡牌效果
//       if (c.cate === boss.cate) {
//         console.log(`> Boss 免疫了 ${c.cateIcon} 的效果`);
//         return; // boss免疫自身花色牌的效果，所以当花色和boss相同，则直接return
//       }
//       switch (c.cate) {
//         case 1: // 黑桃降低boss攻击力
//           boss.atk -= sum;
//           console.log(`> 降低了 Boss ${sum} 点攻击力`);
//           break;
//         case 2: // 红桃回归勇士
//           shuffle(this.discard); // 弃牌区洗牌
//           const recoverCards = this.discard.splice(0, sum); // 从弃牌区拿起sum张牌
//           this.deck.push(...recoverCards); // 插入酒馆牌中
//           shuffle(this.deck); // 洗牌
//           console.log(
//             `> 从弃牌堆中随机抽取了 ${recoverCards.length} 张卡牌放回酒馆`
//           );
//           break;
//         case 3: // 草花双倍攻击，可以理解为触发技能的时候直接造成一次伤害，后续结算再次造成一次伤害
//           // 所以这里直接触发一次伤害
//           boss.hp -= sum;
//           console.log(`> ♣️效果对 Boss 造成了 ${sum} 点伤害`);
//           break;
//         case 4: // 方片抽牌
//           this.getCard(sum); // 直接调用抽牌方法，抽对应数量的牌即可
//           break;
//       }
//     });
//     // 处理卡牌伤害
//     boss.hp -= sum;
//     console.log(`> 对 Boss 造成 ${sum} 点伤害`);
//   }
//   /** boss回合，返回是否游戏结束 */
//   async bossTurn() {
//     const boss = this.currentBoss!;
//     // 先检查boss是否存活
//     if (boss.hp <= 0) {
//       // 死了
//       //这里重新生成卡牌，因为boss的血量，攻击可能都被削减过
//       const bossCard = new Card(boss.number, boss.cate);
//       if (boss.hp === 0) {
//         console.log(`> 精准伤害！成功规劝了 Boss ${boss.display()}`);
//         this.deck.push(bossCard); // 规劝成功，直接放回酒馆牌
//         shuffle(this.deck); // 洗牌
//       } else {
//         console.log(`> 击败了 Boss ${boss.display()}`);
//         this.discard.push(bossCard); // 直接打死了就放进弃牌区，只有回归牌组才有可能被使用
//       }
//       // 将打牌区的牌也放入弃牌区
//       this.discard.push(...this.playArea);
//       this.playArea = []; // 重置打牌区
//       // 派出下一个boss
//       this.currentBoss = this.castle.pop();
//       if (!this.currentBoss) return { status: "success" };
//       console.log(`城堡派出了新的 Boss ${this.currentBoss.display()}`);
//       return { status: "continue" };
//     } else {
//       //boss若仍然存活，则发起攻击
//       const atk = boss.atk;
//       if (atk > 0) {
//         // 玩家丢弃对应点数的手牌用以抵御攻击
//         console.log(`受到boss ${atk} 点攻击，请丢弃总和 ${atk} 以上的卡牌`);
//         console.log(`====== 我的手牌 ======
// ${this.myHand.map((c, i) => `[${i}.${c.display()}]`).join(" ")}`);
//         if (await this.discardCards(atk)) return { status: "continue" };
//         return { status: "fail" };
//       }
//       return { status: "continue" };
//     }
//   }
//   /** 丢弃手牌 */
//   async discardCards(sum: number) {
//     // 提前判断一下手牌是否够抵御伤害，不够则直接判负
//     const all = this.myHand.reduce((c, v) => c + v.atk, 0)
//     if (all < sum) return false // 游戏失败
//     const userChoose = await requireInput('请输入需要丢弃的牌的序号，从0开始，多张牌请使用空格隔开:\n>>> ')
//     const idxs = userChoose.trim().split(/\s+/).map(e => Number(e))
//     const cards = idxs.map(i => this.myHand[i]).filter(e => !!e)
//     if (cards.reduce((c, v) => c + v.atk, 0) < sum) {
//       console.log('不足以抵御此次攻击，请重新出牌')
//       return await this.discardCards(sum)
//     }
//     console.log(`> 丢弃 ${cards.map(c => c.display()).join('、')}，成功抵御 ${sum} 点伤害`)
//     idxs.forEach(i => this.myHand[i] = undefined) // 删除手牌
//     this.myHand = this.myHand.filter(c => !!c) // 过滤手牌
//     this.discard.push(...cards) // 放入弃牌堆
//     return true
//   }
// }

// export const regicide = new RegicideSingle();
export {}