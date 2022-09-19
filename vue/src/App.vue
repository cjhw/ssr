<template>
  <div>
    <h3>{{ message }}</h3>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const message = ref('hello vue')
</script>

<style lang="scss" scoped>
body {
  background: #000;
}
h3 {
  margin: 40px 0 0;
  color: #42b983;
}
</style>
