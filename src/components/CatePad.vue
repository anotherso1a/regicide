<script setup lang="ts">
import { computed } from 'vue';

const { cate } = defineProps<{
  cate: number
}>()
const cateStyle = computed(() => {
  const left = (1 - cate) * 100 + '%'
  return `background-position: ${left} 0`;
});
</script>

<template>
  <div class="cate_box">
    <div class="cate_content" :style="cateStyle"></div>
  </div>
</template>

<style scoped>
.cate_box {
  width: 25px;
  display: inline-block;
}

.cate_content {
  width: 100%;
  background-image: url(../assets/suits.png);
  background-size: 400% 100%;
  padding-top: 100%;
}
</style>