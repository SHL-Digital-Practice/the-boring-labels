<template>
  <div
    class="w-full border-white border-4 bg-opacity-30 bg-white transition rounded-full flex items-center justify-center h-10"
    :class="dragging ? 'border-green-400' : 'border-white'"
    @dragover.prevent="dragover"
    @dragleave.prevent="dragleave"
    @drop.prevent="drop"
  >
    <p>Drop it</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const dragging = ref(false);

function dragover() {
  console.log("dragover");
  dragging.value = true;
}

function dragleave() {
  console.log("dragleave");
  dragging.value = false;
}

function drop(event) {
  console.log(event.dataTransfer.files);

  console.log("dropped");
}
</script>

<style scoped></style>
