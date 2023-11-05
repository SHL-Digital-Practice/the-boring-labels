<template>
  <div class="flex justify-center">
    <div
      class="absolute top-0 h-[300px] w-full bg-gradient-to-b from-green-100 to-white -z-10"
    />
    <div class="max-w-md w-full">
      <TheHeader class="pb-4" />

      <Combobox
        :label="'Boring List'"
        :items="candidateLabelSets"
        @selected="(e) => selectList(e.name)"
      />
      <!-- <Combobox
        :label="'Parameter'"
        :items="['P&W Benchmark']"
        @selected="selectList"
      /> -->
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
            <div class="bg-gray-200 text-gray-800 rounded-full px-2">
              <!-- {{ label.labels[0] }} -->
              {{ key }}
            </div>
            <!-- <div>{{ [...label.labels].splice(0, 3) }}</div> -->
          </div>
          <Collapse :when="expanded === key.toString()" class="v-collapse">
            <div
              v-for="item in items"
              class="flex justify-between w-full space-y-2 items-center"
            >
              <p class="flex-none truncate w-[55%]">
                {{ item.sequence }}
              </p>
              <div class="flex space-x-2 w-full justify-between">
                <p class="text-slate-300 text-sm">
                  {{ Math.round(item.scores[0] * 100) }}%
                </p>
                <Dropdown :items="mapLabels(item)" class="w-32 flex-none" />
              </div>

              <!-- add a dropdown here -->
            </div>
          </Collapse>
        </div>
        <div class="w-full justify-end flex p-4">
          <!-- <button
            @click="getLabels"
            class="border-2 rounded-lg px-2 border-slate-200"
          >
            Ask
          </button> -->
          <button
            @click="handleSave"
            class="bg-green-950 text-gray-100 font-semibold rounded-lg px-4 py-2"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import TheHeader from "./components/TheHeader.vue";
import { computed, onMounted, ref, watch } from "vue";
import { pwBenchmark } from "./constats/pw-benchmark";
import { rooms } from "./constats/rooms";
import { useLabelsStore } from "./stores/labels";
import Combobox from "./components/Combobox.vue";
import { group } from "radash";
import { Collapse } from "vue-collapsed";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import { useRevitStore } from "./stores/revit";
import Dropdown from "./components/Dropdown.vue";
import { largeOffice } from "./constats/ashrae-2019-large-office";

const store = useLabelsStore();
const revit = useRevitStore();

const candidateLabelSets = ["P&W Benchmark", "ASHRAE 2019 Large Office"];
const candidateLabels = ref<string[]>(
  selectCandidateLabels(candidateLabelSets[0])
);
const inputs = computed(() => rooms);
const labels = computed(() => store.labels);

const labelGroups = ref("");

const expanded = ref("");
const list = ref("placeholfer");

async function getLabels(item: any) {
  console.log(candidateLabels.value);

  store.labels = [];

  const rooms = await revit.getRoomNames();
  const promises = [];

  let count = 0;

  if (!window.chrome.webview && rooms) {
    for (const room of rooms) {
      const promise = store.fetchLabels(
        {
          source_sentence: room.Name,
          sentences: candidateLabels.value,
        },
        room.ElementId
      );
      count++;

      promises.push(promise);
    }
  } else {
    for (let i = 0; i < inputs.value.length; i++) {
      const promise = store.fetchLabels(
        {
          source_sentence: inputs.value[i],
          sentences: candidateLabels.value,
        },
        count.toString()
      );
      count++;

      promises.push(promise);
    }
  }

  await Promise.all(promises);

  if (!labels.value.length) return;

  const grouped = group(labels.value, (l) => l.labels[0]);

  labelGroups.value = grouped;
}

function selectList(item: string) {
  candidateLabels.value = selectCandidateLabels(item);
  getLabels(candidateLabels.value);
}

function selectCandidateLabels(item: string) {
  if (item === "P&W Benchmark") {
    return pwBenchmark;
  } else if (item === "ASHRAE 2019 Large Office") {
    console.log("dsadssdasdadsasdadsa");

    return largeOffice;
  } else {
    return pwBenchmark;
  }
}

function mapLabels(item: any) {
  const items = item.labels
    .map((l) => ({
      name: l,
      coefficient: item.scores[item.labels.indexOf(l)],
      elementId: item.elementId,
    }))
    .slice(0, 3);

  return items;
}

function expand(key: string) {
  if (expanded.value === key) {
    expanded.value = "";
    return;
  }
  expanded.value = key;
}

async function handleSave() {
  const labels = store.labels;
  for (const label of labels) {
    if (!label.elementId) continue;
    const data =
      await window.chrome.webview.hostObjects.roomsBridge.ChangeParameterValue(
        label.elementId,
        "Boring Name",
        label.labels[0]
      );
  }
}

onMounted(async () => {
  if (!window.chrome.webview) {
    getLabels(candidateLabels.value);
  } else {
    await revit.getRoomNames();
  }
});
</script>
./constats/pw-benchmark
