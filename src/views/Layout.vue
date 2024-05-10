<script setup lang="ts">
import CardDeck from "../components/CardDeck.vue";
import CardView from "../components/Card.vue";
import BigNumberPad from '../components/BigNumberPad.vue'
import CatePad from '../components/CatePad.vue'
import WhiteRound from '../components/WhiteRound.vue'
import Logger from '../components/Logger.vue'
import Rule from '../components/Rule.vue'
import { useSingleStore } from "@/stores/single";
import { computed, reactive } from "vue";
import { storeToRefs } from "pinia";
import { Card } from "@/ts/card";

const {
  currentBoss,
  newGame,
  handlerResetHandCard,
  handlerDiscardCards, // 弃牌
  handlerUseCard // 用牌
} = useSingleStore()
const {
  castle,
  deck,
  myHand,
  playArea,
  discard,
  joker,
  maxHandCard,
  status,
  tipText
} = storeToRefs(useSingleStore())

const skillDescMap = {
  1: '正义之盾：可以抵挡Boss的伤害，抵御值为卡牌的面值，只要出牌后在本场boss对决中会一直生效。',
  2: '勇士回归：随机从弃牌堆中抽取卡牌面值数量的卡牌回归酒馆牌堆，并洗牌酒馆牌堆。',
  3: '双倍伤害：草花牌造成的伤害是卡牌数值的双倍。',
  4: '神之抽牌：从酒馆牌堆中抽取牌面数量的卡牌，但不能超过手牌上限，酒馆牌堆中没有卡片时，无法抽取。'
}

const currentTappedCard: Card = reactive(new Card(0, 1))

const checkedCard: number[] = reactive([])

const restCateList = computed(() => castle.value.length % 4 ? castle.value.slice(-castle.value.length % 4) : [])

const beatedCount = computed(() => 11 - castle.value.length)

function handlerCardClick(e: number) {
  const index = checkedCard.indexOf(e)
  if (!~index) checkedCard.push(e)
  else checkedCard.splice(index, 1)
  Object.assign(currentTappedCard, myHand.value[e])
}

function useCard() {
  handlerUseCard(checkedCard)
  checkedCard.splice(0, 8)
  console.log(currentBoss)
}
function discardCard() {
  handlerDiscardCards(checkedCard)
  checkedCard.splice(0, 8)
}

function useSkill() {
  if (joker.value--) handlerResetHandCard()
}

function handlerNewGame() {
  newGame()
}
</script>

<template>
  <Logger></Logger>
  <Rule></Rule>
  <div class="contianer" :class="`cate${currentBoss?.cate}`">
    <div class="player_board">
      <WhiteRound>
        <div class="player_name">---</div>
        <div class="joker_card">
          <CardView class="joker" @click="useSkill" :cate="joker < 1 ? 3 : 1" :id="0"></CardView>
          <CardView class="joker" @click="useSkill" :cate="joker < 2 ? 3 : 2" :id="0"></CardView>
        </div>
        <div class="rest_card">
          <template v-for="item in maxHandCard">
            <CardView v-if="myHand[item - 1]" class="card_icon" size="small" :cate="3" :id="0"></CardView>
            <div v-else class="blank_dot card_icon"></div>
          </template>
        </div>
        <div class="rest_card_desc">{{ myHand.length }} / {{ maxHandCard }}</div>
      </WhiteRound>
    </div>
    <div class="opt_bar"> <img class="waiting" src="../assets/active_player.gif">
      <div class="tip_text">{{ tipText }}</div>
      <div v-if="status === 'using'" @click="useCard" class="button">出牌</div>
      <div v-else-if="status === 'discarding'" @click="discardCard" class="button discard">弃牌</div>
      <div v-else @click="handlerNewGame" class="button">再来一次</div>
    </div>
    <div class="wrapper">
      <div class="deck_container">
        <div class="comming">
          即将到来:
          <CatePad v-for="item in restCateList" :cate="item.cate"></CatePad>
          {{ restCateList.length ? '' : castle.slice(-1)[0].name }}
        </div>
        <div class="beated">已击败: {{ beatedCount }}</div>
        <CardDeck :number="castle.length">城堡</CardDeck>
        <CardDeck :number="discard.length">弃牌堆</CardDeck>
        <CardDeck :number="deck.length">酒馆</CardDeck>
        <!-- <div class="beated">已击败</div> -->
      </div>
      <div class="battle_container">
        <div class="boss_container" v-if="currentBoss">
          <div class="life_contain">
            <span>生命值</span>
            <BigNumberPad :num="currentBoss.hp"></BigNumberPad>
          </div>
          <CardView :cate="currentBoss.cate" :id="currentBoss.number" size="big"></CardView>
          <div class="atk_contain">
            <span>攻击力</span>
            <BigNumberPad :gray="true" :num="currentBoss.atk < 0 ? 0 : currentBoss.atk"></BigNumberPad>
          </div>
        </div>
        <WhiteRound>
          <div class="area_title">打牌区域</div>
          <div class="card_area">
            <div v-for="item in playArea" class="hand_card_contain fade_in_animation">
              <CardView :cate="item.cate" :id="item.number"></CardView>
            </div>
          </div>
        </WhiteRound>
        <WhiteRound>
          <div class="area_title">我的手牌</div>
          <div class="card_area">
            <div v-for="(item, index) of myHand" :key="item.display()" @click="handlerCardClick(index)"
              class="hand_card_contain fade_in_animation"
              :class="{ checked: checkedCard.includes(index), downed: item.cate === currentBoss?.cate }">
              <CardView :cate="item.cate" :id="item.number"></CardView>
            </div>
          </div>
        </WhiteRound>
      </div>
    </div>
    <WhiteRound class="tip_card_area">
      <template v-if="currentTappedCard.atk">
        <div class="tip_card_name">{{ `${currentTappedCard.cateName + currentTappedCard.name}(${currentTappedCard.display?.()})` }}</div>
        <div class="tip_card_atk">攻击力：<span>{{ currentTappedCard.atk }}</span></div>
        <div class="tip_card_def">可抵御伤害：<span>{{ currentTappedCard.atk }}</span></div>
        <div class="tip_card_desc" v-if="currentTappedCard.number === 1">魔宠降世：A可以作为宠物牌同另一张卡牌一同打出，此时会触发两张卡牌的技能效果，且生效量为打出的两张卡牌数值之和！</div>
        <div class="tip_card_desc" v-if="currentTappedCard.cate === currentBoss?.cate"><strike>{{
        skillDescMap[currentTappedCard.cate!] }}</strike>* 当前Boss免疫此技能</div>
        <div class="tip_card_desc" v-else>{{ skillDescMap[currentTappedCard.cate!] }}</div>
      </template>
    </WhiteRound>
  </div>
</template>

<style scoped>
.contianer {
  width: 750px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  transition: all .5s ease;
  background: url(../assets/background_1.png) repeat-x rgb(83, 99, 115);
}

.contianer.cate1 {
  background: url(../assets/background_1.png) repeat-x rgb(83, 99, 115);
}

.contianer.cate2 {
  background: url(../assets/background_2.png) repeat-x rgb(107, 78, 86);
}

.contianer.cate3 {
  background: url(../assets/background_3.png) repeat-x rgb(83, 99, 115);
}

.contianer.cate4 {
  background: url(../assets/background_4.png) repeat-x rgb(137, 92, 89);
}

.player_board {
  padding: 2px;
  box-sizing: border-box;
  border-radius: 8px;
  overflow: hidden;
}

.player_name {
  color: #008000;
  font-size: 16px;
  font-weight: 700;
}

.joker_card,
.rest_card,
.rest_card_desc {
  display: flex;
  justify-content: center;
}

.joker_card .joker {
  margin: 5px;
}

.rest_card .card_icon {
  margin: 4px;
}

.blank_dot {
  display: inline-block;
  height: 28px;
  margin-right: 1px;
  width: 20px;
  background: url(../assets/black_dot.png);
  background-position: unset;
  background-size: 100% 100%;
  box-shadow: unset;
}

.opt_bar {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  box-shadow: 0 3px 8px rgb(0 0 0 / 30%);
  font-size: 18px;
  font-weight: 700;
  line-height: 32px;
  text-align: center;
  background-color: #f8f8f8;
}

.opt_bar .tip_text {
  margin: 0 4px;
}

.opt_bar .waiting {
  width: 32px;
  height: 32px;
}

.opt_bar .button {
  display: inline-block;
  background: #4871b6;
  border-radius: 6px;
  box-shadow: 0 1px 0 #000;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 10px;
  margin-top: 10px;
  overflow: hidden;
  padding: 6px 12px;
  text-overflow: ellipsis;
  text-shadow: rgb(0 0 0 / 40%) 0 1px 0;
  vertical-align: middle;
  white-space: nowrap;
}

.opt_bar .button.discard {
  background: #c92727;
}

.wrapper {
  width: 100%;
  display: flex;
  align-items: center;
}

.deck_container {
  width: 30%;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.comming,
.beated {
  display: flex;
  align-items: center;
  margin: 5px 0;
  font-size: 20px;
  font-family: Roboto, Arial, sans-serif;
  font-weight: 700;
}

.battle_container {
  width: 70%;
  box-sizing: border-box;
  padding: 2px;
}

.boss_container {
  margin-bottom: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.life_contain,
.atk_contain {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #804d4d;
  font-weight: 700;
  font-size: 30px;
  margin: 20px 0;
  text-align: center;
}

.life_contain>span,
.atk_contain>span {
  margin-bottom: 10px;
}

.atk_contain {
  color: #604b45;
}

.area_title {
  font-size: 16px;
  font-weight: bold;
}

.card_area {
  margin-top: 10px;
  min-height: 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card_area .hand_card_contain {
  transition: all .3s ease;
  margin: 0 5px 8px 5px;
}

/* .hand_card_contain.downed {
  filter: grayscale(0.8)
} */

.hand_card_contain.checked {
  box-shadow: 0 0 15px red;
}


.fade_in_animation {
  animation: fadeIn 1s ease-in-out;
}

.tip_card_area {
  font-size: 20px;
}
.tip_card_name {
  text-align: center;
  font-weight: 700;
  margin: 5px 0;
}
.tip_card_atk, .tip_card_def {
  font-weight: 700;
  margin: 5px 0;
}
.tip_card_atk span {
  color: red;
}
.tip_card_def span {
  color: green;
}
.tip_card_desc{
  line-height: 28px;
  margin: 5px 0;
  font-size: 18px;
  font-weight: 700;
}


@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-100px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* .container.remove .box {
  animation: fadeOut 1s ease-in-out;
} */

@keyframes fadeOut {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translateY(-100px);
  }
}
</style>
