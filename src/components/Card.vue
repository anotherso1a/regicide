<script setup lang="ts">
import { computed, toRefs } from "vue";
import type { CardId, Cate } from "../ts/const";

const props = defineProps<{
  id: CardId;
  cate: Cate;
  size?: "small" | "normal" | "big";
}>();
const { id, cate } = toRefs(props)
const cardStyle = computed(() => {
  const top = -(cate.value - 1) * 100 + "%";
  const left = -id.value * 100 + "%";
  return `background-position: ${left} ${top}`;
});
</script>

<template>
  <div class="card_box" :class="size || 'normal'">
    <div class="hand_card" :style="cardStyle"></div>
  </div>
</template>

<style scoped>
.card_box {
  transition: all .5s ease;
  display: inline-block;
}
.card_box.small {
  width: 20px;
}
.card_box.normal {
  width: 100px;
}
.card_box.big {
  width: 200px;
}
.hand_card {
  background-image: url(../assets/cards_0.png);
  background-position: 0 -200%;
  background-size: 1400% 400%;
  border-radius: 5%;
  box-shadow: 1px 1px 2px #000;
  width: 100%;
  padding-top: 140%;
  box-sizing: border-box;
  margin-right: 1px;
  transition: all .5s ease;
  /* vertical-align: sub; */
}
</style>
