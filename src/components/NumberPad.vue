<script setup lang="ts">
import { computed } from 'vue';

const { n } = defineProps<{
  n: number
  gray?: boolean
}>()
const numberStyle = computed(() => {
  const top = -Math.floor(n / 5) * 100 + '%'
  const left = -n % 5 * 100 + '%'
  return `background-position: ${left} ${top}`;
});
</script>

<template>
  <div class="number_box">
    <div class="number_content" :class="{gray}" :style="numberStyle"></div>
  </div>
</template>

<style scoped>
.number_box {
  width: 60px;
  display: inline-block;
  transition: all .5s ease;
}

.number_content {
  width: 100%;
  background-size: 500% 200%;
  background-image: url(../assets/number_1.png);
  padding-top: 133.3333%;
  transition: all .5s ease;
}

.number_content.gray {
  background-image: url(../assets/number_2.png);
}
</style>