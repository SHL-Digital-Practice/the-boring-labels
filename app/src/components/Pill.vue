<template>
  <template v-if="!coefficient || coefficient > 0.6">
    <div
      @click="select(label)"
      class="cursor-pointer bg-green-200 text-green-800 rounded-full px-2 w-32 truncate"
    >
      {{ label }}
    </div>
  </template>
  <template v-else-if="coefficient > 0.2">
    <div
      @click="select(label)"
      class="cursor-pointer bg-yellow-200 text-yellow-800 rounded-full px-2 w-32 truncate"
    >
      {{ label }}
    </div>
  </template>
  <template v-else>
    <div
      @click="select(label)"
      class="cursor-pointer bg-red-200 text-red-800 rounded-full px-2 w-32 truncate"
    >
      {{ label }}
    </div>
  </template>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string;
  coefficient?: number;
}>();

const emit = defineEmits<{
  (event: "selected", label: string): void;
}>();

function select(label: string) {
  emit("selected", label);
}
</script>

<style scoped></style>
