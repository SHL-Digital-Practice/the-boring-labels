<template>
  <div>
    <h1 class="text-3xl font-bold underline text-orange-400">Hello Boring!</h1>
    <h4>Logo</h4>
    <link rel="manifest" href="manifest.json" />
    <div class="flex flex-col">
      <!-- <div v-for="room in rooms">
        <div>{{ room }}</div>
      </div> -->

      labels
      <div v-for="label in labels" class="flex border-b border-slate-500">
        <div>{{ label.sequence }}</div>
        <div>{{ [...label.labels].splice(0, 3) }}</div>
      </div>
      <div>
        <button
          @click="getLabels"
          class="border-2 rounded-lg px-2 border-slate-200"
        >
          Ask
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import { spaces as spacesPw } from "./constats/spaces-pw";
import { rooms } from "./constats/rooms";
import { useLabelsStore } from "./stores/labels";
const store = useLabelsStore();

const candidateLabels = computed(() => spacesPw);
const inputs = computed(() => rooms);
const labels = computed(() => store.labels);

console.log(spacesPw.join(","), spacesPw);

function getLabels() {
  store.labels = [];

  for (let i = 0; i < inputs.value.length; i++) {
    store.fetchLabels({
      inputs: inputs.value[i],
      parameters: { candidate_labels: candidateLabels.value },
    });
  }
}
</script>
