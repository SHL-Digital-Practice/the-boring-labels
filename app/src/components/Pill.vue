<template>
  <div class="bg-green-200 text-green-800 rounded-full px-2">
    {{ label }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string;
  coefficient?: number;
}>();
</script>

<style scoped></style>
