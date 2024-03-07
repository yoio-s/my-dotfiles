<script setup lang="ts">
const props = defineProps<{
  count: number
}>()

const emits = defineEmits<{
  'update:count': [value: number]
}>()

const resCount = computed({
  get: () => {
    return props.count
  },
  set: newValue => {
    emits('update:count', newValue)
  },
})
</script>

<template>
  <div class="text-primary text-8xl">{{ resCount }}</div>
  <n-button class="mt-4" @click="resCount++"> add count </n-button>
</template>
