<script setup lang="ts">
import { useNumberTrans } from '@/ts/useNumberTrans';
import { computed, watch } from 'vue';
import NumberPad from './NumberPad.vue'
const props = defineProps<{
  num: number
  gray?: boolean
}>()
const { display, start } = useNumberTrans(props.num)
watch(() => props.num, (v = 0, o = 0) => {
  start(o, v, 1500) // 执行动画
})
const nums = computed(() => {
  return String(display.value).split('').map(i => Number(i))
})
</script>

<template>
  <div class="big_number_box">
    <NumberPad v-for="(item, index) in nums" :key="index + '' + item" :n="item" :gray="gray"></NumberPad>
  </div>
</template>

<style scoped>

</style>