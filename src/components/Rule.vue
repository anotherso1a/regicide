<script setup lang="ts">
import { ref } from 'vue';
const collapse = ref(true)

function handlerOpen() {
  collapse.value = false
}
function handlerClose() {
  collapse.value = true
}

</script>
<template>
  <div class="rule_contaion" :class="{ collapse }">
    <div class="rule_icon" v-if="collapse" @click="handlerOpen"></div>
    <div class="rule_content" v-else>
      <h1>REGICIDE</h1>
      <p>人数: 2-4</p>
      <p>配件:54张卡牌</p>
      <p>年龄:10+</p>
      <h2>简介</h2>
      <p>
        “邪恶的腐败已经蔓延到了那四座伟大的王国，玷污了他们的受人爱戴额王与后，以及他们的卫士。伟大而勇敢的冒险者啊，请你与你的伙伴一同，将腐朽的君王拉下王座，净化那蛊惑人心的可怕黑暗，让理智与善良重新回归他们的心灵，让这片大地得以重新焕发光彩。”
      </p>
      <p>[摘自集石app - 或有遗漏和错误，发现请联系我或在评论区留言 谢谢]</p>
      <h2>游戏目标</h2>
      <p>
        Regicide是一款合作游戏，2-4名玩家将戮力同心，打败12个强大的敌人。玩家们轮流出牌，对敌人造成攻击，当攻击足够多时，敌人便会溃败，当最后一位国王被击败时，玩家们就会赢得胜利。但是当心！敌人是会反击的。玩家们将会被迫弃牌来承受伤害，如果不能再弃牌，所有人都会失败！
      </p>
      <h2>游戏设置</h2>
      <p>将4张国王(K) 洗混，然后把他们面朝下放到桌子中央，将四章皇后(Q)洗混，然后把它们面朝下放在国王之上。将四张杰克(J)洗混，放在皇后之上，构成城堡牌堆。</p>
      <p>把城堡牌堆放到桌面中央，翻开第一张杰克。这就是当前的敌人。</p>
      <p>把剩余的标有2-10的牌与宠物牌(A)与署长小丑洗混，小丑的数量取决于游戏人数，构成你的酒馆牌堆。</p>
      <p>酒馆牌堆是你打出和获得卡牌的区域，游戏中被弃掉的卡牌放在酒馆牌堆旁边的弃牌堆。</p>
      <p>每位玩家抽牌至手牌上限</p>
      <p>4玩家-2小丑-5上限</p>
      <p>3玩家-1小丑-6上限</p>
      <p>2玩家-0小丑-7上限</p>
      <h2>游戏流程</h2>
      <p>在自己的回合内中，每位玩家按照顺序从手中出牌来对当前的敌人造成伤害。卡牌上的数值时伤害值，而花色指向了一种特殊能力。</p>
      <p>玩家在任何时候都不能交流关于他们手牌的信息。当然，如果这是你的第一次游戏，或者你想玩的随意一点，请随意。</p>
      <p>每个回合都有四个阶段</p>
      <h3>阶段一：打出卡牌</h3>
      <p>打出一张卡牌来试图造成伤害。</p>
      <p>从你的手中打出一张卡牌，卡牌上的数值决定了它的伤害。除去打出卡牌，玩家也可以选择跳过(查看“跳过”)</p>
      <h3>阶段二：激活技能</h3>
      <p>激活你打出卡牌的对应技能</p>
      <p>打出卡牌在造成伤害的同时，也会激活对应的技能。红牌的技能会立即结算，而黑牌的技能将会在之后的阶段中发挥作用。</p>
      <p><b>红桃</b> -从弃牌堆恢复：洗混弃牌堆，然后面朝下抽出该卡片数值相同数量的卡牌。把它们放到酒馆牌堆底，然后将弃牌堆正面朝上放回桌面。</p>
      <p><b>方片</b> -
        抽卡：当前玩家抽一张卡，然后按照顺时针方向，每人一次抽一张牌，直到所有人抽牌数量之和等于该打出的卡牌的数值。达到手牌上线的玩家不能抽牌，而是直接跳过，玩家永远不能拥有超过手牌上限的牌。当你试图从空的酒馆牌堆中抽牌时，游戏并不会失败。
      </p>
      <p><b>草花</b> - 双倍伤害：在阶段三，草花牌造成的伤害是卡牌数值的双倍。</p>
      <p><b>黑桃</b> - 抵挡敌人的伤害：在阶段四，减少敌人的伤害，减少的数值与该卡牌的数值相等。抵挡的效果是所有玩家打出黑桃牌的总和，抵挡的效果会一直持续，直到当前敌人被击败。</p>
      <h3>阶段三：造成伤害</h3>
      <p>造成伤害，并且检查敌人是否被击败。</p>
      <p><b>杰克</b>：10点攻击、20点血量</p>
      <p><b>王后</b>：15点攻击、30点血量</p>
      <p><b>国王</b>：20点攻击、40点血量</p>
      <p>卡牌上的数值就是玩家对敌人造成的伤害，查看玩家造成的伤害总和是否大于等于敌人的血量，例如如果面对一名杰克，一个玩家在先前的回合造成了9点伤害，而当前玩家造成了12点伤害，那么他们总共造成了21点的伤害。敌人被击败。</p>
      <p>如果敌人被击败，按照如下步骤：</p>
      <p>1.将敌人放到弃牌堆顶。但是，如果造成的伤害刚好与血量相等，把他面朝下放到酒馆牌堆顶。</p>
      <p>2.将玩家打出的所有牌弃掉。</p>
      <p>3.从城堡牌堆翻出下一张牌。</p>
      <p>4.刚刚击败敌人的玩家跳过阶段4，然后直接开始一个新的回合，从阶段一，对抗新的敌人。</p>
      <h3>阶段四：承受伤害</h3>
      <p>以弃牌的方式承受来自敌人的伤害。</p>
      <p>如果敌人没有被击败，他会对当前玩家造成等同于其攻击值的伤害，记得将敌人的攻击值减少等同于对其打出的黑桃拍的数值总和的值。</p>
      <p>
        当前玩家必须从手牌中弃掉数值之和大于等于自己承受伤害的卡牌。将这些牌一次性正面向上放到弃牌堆。弃掉牌后手中没有牌是被允许的。然后下一位玩家开始他的回合，从阶段一开始。在弃牌时宠物牌(A)算作1点，而小丑牌算作0点。如果某位玩家无法弃掉数值之和大于等于受到的伤害值的卡牌，他立即死亡，所有玩家输掉游戏，但弃空手牌是没有关系的。
      </p>
      <p>当前玩家承受伤害之后，按照顺时针方向（左手方向），下一位玩家从阶段一开始进行他的回合。</p>
      <h2>特别解释</h2>
      <h3>敌人的免疫效果</h3>
      <p>所有的敌人都将免疫与自己花色相同的牌的能力。例如玩家再对抗方片J的时候便无法在打出方片之后抽牌（不过这张牌依旧造成伤害）。玩家可以打出小丑牌来取消当前敌人的免疫效果。</p>
      <h3>打出小丑牌</h3>
      <p>在阶段一，玩家可以打出小丑牌（单独打出）。</p>
      <p>小丑的数值是0点，其效果是取消当前敌人的免疫效果，这意味着与当前敌人花色相同的卡牌的技能也会生效。在你打出小丑牌之后，直接跳过阶段三和四，然后由你指定下一个进行回合的玩家，而不是你的下家进行新回合。</p>
      <p>在打出小丑牌后，玩家的交流限制可以有所改变，玩家们可以表达自己是否想要成为下一个出牌的玩家。</p>
      <p>如果一张小丑在对抗黑桃花色的敌人时被打出了，先前打出的黑桃也会立即生效，减少敌人造成的伤害。然而，草花不行。</p>
      <h3>宠物牌</h3>
      <p>在阶段一，宠物牌也可以单独打出，但也可以和另一张牌一起打出（除了小丑）。宠物牌在计算伤害时算作1点，并且会为这次出牌添加自己花色的效果。</p>
      <p>>方片8＋草花A 可与抽9张牌并打出18点伤害。</p>
      <p>注意：当红桃与方片的效果同时触发，红桃效果优先。</p>
      <p>宠物牌可以和其他宠物牌一起打出。但如果宠物牌和某个一同打出的牌花色相同，这种花色的技能只会触发一次。</p>
      <h3>连招</h3>
      <p>在阶段一，你可以选择不单独出牌，而是出若干张数值相同的牌，只要其数值总和不超过10。宠物牌不可以和这些牌一起打出。也不能用来和一张宠物牌组成连招。</p>
      <p>所以连招样式有</p>
      <p>一对1，2，3，4，5</p>
      <p>三张2，3</p>
      <p>四张2</p>
      <p>当这样出牌时，所有出牌的花色的能力都会以数值总和为数值来触发，并且造成数值总和的伤害。</p>
      <h3>归化敌人</h3>
      <p>手牌中的JQK分别视为10点，15点，20点。花色效果与其他牌相同。</p>
      <h3>跳过</h3>
      <p>
        在阶段一时玩家可以选择跳过而不是出牌，选择跳过后，直接进入阶段四。如果除去当前玩家之外的所有玩家都在他们的最后一个回合选择跳过，当前玩家不可以跳过。例如，三人游戏中，有两位玩家在他们的最后一回合选择跳过，那么当前玩家就不能跳过。
      </p>
      <h3>交流</h3>
      <p>玩家不可以交流自己手牌的具体信息或者是暗示自己手牌成分，不过可以交流一些显而易见的事情，比如自己的手牌数量，牌堆数量。</p>
      <p>当小丑牌打出后，交流限制会暂时改变，玩家们可以笼统表达是否想成为下一个出牌玩家。</p>
      <h3>游戏结束</h3>
      <p>当玩家击败所有国王，玩家胜利。</p>
      <p>当有一名玩家无法承受敌人的伤害时，或者某位玩家无法出牌且跳过时，玩家失败。</p>
      <h3>单人游戏</h3>
      <p>当进行单人游戏时，规则会有以下变化。</p>
      <p>照常进行游戏设置，但将两张小丑放在一旁。手牌上限8。</p>
      <p>游戏流程照常，你连续进行回合，你可以将一张小丑翻面来使用如下能力：“弃掉所有手牌，然后抽8张-这不算作方片的抽牌效果，所以不受到敌人免疫的限制” 你一局可以使用两次小丑牌效果，翻面小丑牌不会取消当前敌人的免疫效果。你可以在
        阶段一 打出卡牌前或者 阶段四承受伤害前使用小丑牌。</p>
      <p>使用2次小丑获胜=弑君铜奖</p>
      <p>使用1次小丑获胜=弑君银奖</p>
      <p>使用0次小丑获胜=弑君金奖</p>
      <h1>提示</h1>
      <p>不要急于杀敌，你可以慢慢地玩这个游戏。</p>
      <p>如果下一个出现的是方块单位，试着想想你能做什么来对付它，你也许需要在前一个单位用出方块牌。</p>
      <p>当有新的敌人来时，尽量先下黑桃。</p>
      <p>对付梅花的敌人，一个好的策略是打黑桃以减少他们的攻击力到0，然后你可以大量打红心、方块和低牌。对付红心也可以这样做，但威力较小。</p>
      <p>当你持有一些方块牌时，不要害怕弃牌过多，特别是弃2这样的坏牌。</p>
      <p>当敌人来时，你可以用梅花快速杀死他，也可以通过打黑桃来拖延时间。你还可以选择通过打方块（和红桃）来回牌，让下一个玩家决定如何处理这个单位（但这样拖延的效果就不明显了）。</p>
      <p>让敌人保持低攻击（&lt;3）往往比0攻击要好，除了对付红桃和你需要红桃的时候。</p>
      <p>当对手的攻击力很低时，不要犹豫不出牌直接承受伤害，这可以让你丢弃坏牌。</p>
      <p>对付梅花的敌人，除非你打算留着对付后来的敌人，不要犹豫打出梅花。</p>
      <p>计算牌库要知道的：</p>
      <p>出牌放在桌子中间，弃牌放在弃牌堆里。当打出红桃时，会先从弃牌堆中随机抽出一些牌放到酒馆的底部。当敌人被打败时，中间的牌会被放到弃牌堆里。</p>
      <p>如果你开始时有很多方块牌，那么你的酒馆里很有可能缺少方块牌。也就是说，如果你丢弃了太多的方块牌，很有可能在之后一段时间内抽不到方块。</p>
      <p>
        如果弃牌堆里的牌不多，你可以试着把一些好牌放在那里，然后再出一张红桃。(例如，如果你用红桃杀了敌人的J，然后打出梅花5和其他任何5，你以刚好的伤害杀了下一个J，那你的两个5将在弃牌堆中独占。如果你能在之后再出一张红桃，那么这两张5将在抽牌堆中相邻。如果你的队友刚刚出了两张5，你立即再出一张5，有更大的机会让5在牌面上相邻，发挥更大作用）。
      </p>
      <p>在2个玩家时，如果对方弃的牌比需要的点数更多，这通常意味着他有一些方块牌。</p>
      <div class="close" @click="handlerClose">我知道了</div>
    </div>
  </div>
</template>
<style scoped>
.rule_contaion {
  position: relative;
  width: 750px;
  height: 100%;
  top: 0;
  right: 0;
  box-sizing: border-box;
  position: fixed;
  background-color: #fff;
  padding: 10px;
  overflow: auto;
  z-index: 999;
  transition: all .5s ease;
}

.rule_icon {
  background-image: url(../assets/exclamation.png);
  width: 32px;
  height: 32px;
  background-size: 100% 100%;
}

.rule_contaion.collapse {
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  background-color: transparent;
  padding: 0;
}

.rule_content {
  box-sizing: border-box;
  font-size: 16px;
  font-weight: 400;
  width: 100%;
  padding: 4px;
  padding-bottom: 80px;
}

.rule_content p{
  margin: 5px 0;
}
.rule_content h1,
.rule_content h2,
.rule_content h3{
  font-weight: 700;
  margin: 8px 0;
}
.rule_content h1 {
  font-size: 28px;
  text-align: center;
}
.rule_content h2 {
  font-size: 26px;
}
.rule_content h3 {
  font-size: 24px;
}
.close{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: cornflowerblue;
  color: #fff;
  text-align: center;
  font-size: 30px;
  font-weight: 700;
  height: 60px;
  line-height: 60px;
  border-radius: 8px;
}
</style>