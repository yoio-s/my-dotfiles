<template>
  <div class="text-5xl text-blue-500 flex justify-center items-center">
    home
  </div>
  <div class="flex justify-center flex-col items-center">
    <CountAdd v-model:count="count" />
  </div>
</template>

<script lang="ts" setup>
const count = ref(1)
</script>
