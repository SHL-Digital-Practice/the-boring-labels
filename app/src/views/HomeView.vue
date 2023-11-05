<template>
  <div class="flex justify-center w-screen h-screen overflow-y-scroll">
    <div
      class="absolute top-0 h-[300px] w-full bg-gradient-to-b from-green-100 to-white -z-10"
    />
    <div class="max-w-lg w-full">
      <TheHeader class="pb-4" />
      <!-- <TheDropzone /> -->

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
          class="border-b-[1px] border-slate-200 w-full py-3 px-4"
        >
          <div
            class="flex w-full justify-between cursor-pointer"
            @click.stop="expand(key.toString())"
          >
            <div class="flex items-center">
              <ChevronDownIcon
                class="h-5 transition-all duration-300"
                :class="
                  expanded !== key.toString() ? ['-rotate-90'] : ['rotate-0']
                "
              />
              <div class="text-xs">
                {{ items.length }}
              </div>
            </div>
            <div
              class="bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-xs"
            >
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
                <p class="text-slate-300 text-xs">
                  {{ Math.round(item.scores[0] * 100) }}%
                </p>
                <Dropdown
                  :items="mapLabels(item)"
                  class="flex-grow flex justify-end"
                />
              </div>

      <Transition
        enter-active-class="transition ease-out duration-1000"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
      >
        <div
          v-if="isLoading"
          class="w-full h-full flex items-center justify-center"
        >
          <TheLoader />
        </div>
        <div class="flex flex-col" v-else>
          <div
            v-for="(items, key) of labelGroups"
            class="border-b-[1px] border-slate-200 w-full py-3 px-4"
          >
            <div
              class="flex w-full justify-between cursor-pointer"
              @click.stop="expand(key.toString())"
            >
              <div class="flex items-center">
                <ChevronDownIcon
                  class="h-5 transition-all duration-300"
                  :class="
                    expanded !== key.toString() ? ['-rotate-90'] : ['rotate-0']
                  "
                />
                <div class="text-xs">
                  {{ items.length }}
                </div>
              </div>
              <div
                class="bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-xs"
              >
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
                  <p class="text-slate-300 text-xs">
                    {{ Math.round(item.scores[0] * 100) }}%
                  </p>
                  <Dropdown :items="mapLabels(item)" class="w-32 flex-none" />
                </div>

                <!-- add a dropdown here -->
              </div>
            </Collapse>
          </div>
          <div class="w-full justify-end flex p-4">
            <button
              @click="handleSave"
              class="bg-green-950 text-gray-100 font-semibold rounded-lg px-2 text-sm py-1"
            >
              Save
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TheHeader from "@/components/TheHeader.vue";
import { computed, onMounted, ref, watch } from "vue";
import { pwBenchmark } from "@/constats/pw-benchmark";
import { rooms } from "@/constats/rooms";
import { useLabelsStore } from "@/stores/labels";
import Combobox from "@/components/Combobox.vue";
import { group } from "radash";
import { Collapse } from "vue-collapsed";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import { useRevitStore } from "@/stores/revit";
import Dropdown from "@/components/Dropdown.vue";
import { largeOffice } from "@/constats/ashrae-2019-large-office";
import TheLoader from "@/components/TheLoader.vue";
import TheDropzone from "@/components/TheDropzone.vue";

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
const isLoading = ref(false);

const list = ref("placeholfer");

async function getLabels(item: any) {
  console.log(candidateLabels.value);

  isLoading.value = true;

  store.labels = [];

  const rooms = await revit.getRoomNames();
  const promises = [];

  let count = 0;
  

  if (!window.chrome.webview && rooms) {
    console.log("on the web")
    
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
  } else {
    console.log("in revit")
    for (const room of rooms) {
      console.log("room", room)
      console.log("candidate labels", candidateLabels.value)
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
  }

  await Promise.all(promises);

  isLoading.value = false;

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
    .map((l: any) => ({
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
