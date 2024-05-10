<script setup lang="ts">
import { useSingleStore } from '@/stores/single';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const { loggers } = storeToRefs(useSingleStore())

const collapse = ref(true)

function handlerClick() {
  collapse.value = !collapse.value
}

</script>
<template>
  <div class="logger_contain" :class="{ collapse }" @click="handlerClick">
    <div class="log_content" v-for="log in loggers">{{ log }}</div>
  </div>
</template>
<style>
.logger_contain {
  width: 300px;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 10px;
  max-height: 600px;
  overflow: auto;
  transition: all .5s ease;
}

.logger_contain.collapse {
  max-height: 25px;
}

.log_content {
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.6);
  font-size: 16px;
  font-weight: 700;
  width: 100%;
  padding: 4px;
  margin: 3px 0;
}
</style>