<template>
  <template v-if="!coefficient" class="text-xs">
    <div
      @click="select(label)"
      class="cursor-pointer bg-slate-200 text-slate-800 rounded-full px-2"
    >
      {{ label }}
    </div>
  </template>
  <template v-else-if="coefficient > 0.4">
    <div
      @click="select(label)"
      class="cursor-pointer bg-green-200 text-green-800 rounded-full px-2"
    >
      {{ label }}
    </div>
  </template>

  <template v-else-if="coefficient > 0.3">
    <div
      @click="select(label)"
      class="cursor-pointer bg-yellow-200 text-yellow-800 rounded-full px-2"
    >
      {{ label }}
    </div>
  </template>
  <template v-else>
    <div
      @click="select(label)"
      class="cursor-pointer bg-red-200 text-red-800 rounded-full px-2"
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
