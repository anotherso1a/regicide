<script setup lang="ts">
import { useNumberTrans } from "@/ts/useNumberTrans";
import { ref, watch } from "vue";
import Card from "./Card.vue";
const props = defineProps<{
  number?: number;
}>();

const animationDuration = 1500

const changing = ref(false)
const { display, start } = useNumberTrans(props.number)
watch(() => props.number, (v = 0, o = 0) => {
  start(o, v, animationDuration) // 执行动画
  changing.value = true
  setTimeout(() => changing.value = false, animationDuration)
})

</script>

<template>
  <div class="deck_contain">
    <div class="deck_name">
      <slot></slot>
    </div>
    <Card v-if="number" :cate="3" :id="0"></Card>
    <div v-else class="blank"></div>
    <div class="number" :class="{ changing }">{{ display }}</div>
  </div>
</template>

<style scoped>
.deck_contain {
  position: relative;
  margin: 5% 0;
  text-align: center;
  width: -moz-fit-content;
  width: fit-content;
  align-items: center;
  display: flex;
  flex-direction: column;
}

.deck_name {
  margin: 5px 0;
  color: black;
  font-family: Roboto, Arial, sans-serif;
  font-size: 20px;
  font-weight: bold;
}

.blank {
  border-radius: 5px;
  height: 140px;
  width: 100px;
  box-shadow: inset 0 0 0 3px #000;
}

.number {
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 40px;
  line-height: 140px;
  font-weight: 700;
  text-align: center;
  text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff,
    1px 1px 0 #fff, 2px 2px 4px #fff;
}

.changing {
  color: red;
}
</style>
