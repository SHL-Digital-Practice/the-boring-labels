<template>
  <div class="flex justify-center">
    <div class="max-w-md w-full">
      <h1 class="text-3xl font-extrabold text-slate-500">Boar Ring</h1>

      <Combobox
        :label="'Boring List'"
        :items="['P&W Benchmark']"
        @selected="selectList"
      />
      <Combobox
        :label="'Parameter'"
        :items="['P&W Benchmark']"
        @selected="selectList"
      />
      <link rel="manifest" href="manifest.json" />
      <div class="flex flex-col">
        <div
          v-for="(items, key) of labelGroups"
          class="border-b-2 border-slate-200 w-full py-4 px-4"
        >
          <div
            class="flex w-full justify-between"
            @click.stop="expand(key.toString())"
          >
            <div class="flex items-center">
              <ChevronDownIcon class="h-5" />

              {{ items.length }}
            </div>
            <div class="bg-green-200 text-green-800 rounded-full px-2">
              <!-- {{ label.labels[0] }} -->
              {{ key }}
            </div>
            <!-- <div>{{ [...label.labels].splice(0, 3) }}</div> -->
          </div>
          <Collapse :when="expanded === key.toString()" class="v-collapse">
            <div class="" v-for="item in items">
              {{ item.sequence }}
            </div>
          </Collapse>
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
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";
import { spaces as spacesPw } from "./constats/spaces-pw";
import { rooms } from "./constats/rooms";
import { useLabelsStore } from "./stores/labels";
import Combobox from "./components/Combobox.vue";
import { group } from "radash";
import { Collapse } from "vue-collapsed";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import { useRevitStore } from "./stores/revit";

const store = useLabelsStore();
const revit = useRevitStore();

const candidateLabels = computed(() => spacesPw);
const inputs = computed(() => rooms);
const labels = computed(() => store.labels);

const labelGroups = ref("");

const expanded = ref("");
const list = ref("placeholfer");

async function getLabels() {
  store.labels = [];
  const promises = [];

  const rooms: string[] = await revit.getRoomNames();
  console.log(rooms)

  for (const room of rooms) {
    const promise = store.fetchLabels({
      inputs: room,
      parameters: { candidate_labels: candidateLabels.value },
    });
    promises.push(promise);
  }

  await Promise.all(promises);
  const grouped = group(labels.value, (l) => l.labels[0]);

  labelGroups.value = grouped;

  console.log("groupedLabels", labelGroups.value);
}

function selectList(item: string) {
  list.value = item;
}

function expand(key: string) {
  if (expanded.value === key) {
    expanded.value = "";
    return;
  }
  expanded.value = key;
}

onMounted(async () => {
  await revit.getRoomNames();
});
</script>
