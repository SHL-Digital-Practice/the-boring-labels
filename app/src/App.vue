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
            <div
              v-for="item in items"
              class="flex justify-between w-full space-y-2 items-center"
            >
              <p class="flex-none truncate w-3/5">
                {{ item.sequence }}
              </p>
              <div class="flex space-x-2">
                <p class="text-slate-300">
                  {{ Math.round(item.scores[0] * 100) }}%
                </p>
                <Dropdown :items="mapLabels(item)" class="w-32" />
              </div>

              <!-- add a dropdown here -->
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
          <button @click="handleSave">
            Save
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

async function getLabels(item: any) {
  store.labels = [];
  const promises = [];

  const rooms = await revit.getRoomNames();
  console.log(rooms)

  let count = 0
  for (const room of rooms) {
    console.log(room.Name)
    const promise = store.fetchLabels({
      source_sentence: room.Name,
      sentences: candidateLabels.value,
    }, room.ElementId);
    promises.push(promise);
    count++
  }

  await Promise.all(promises);

  if (!labels.value.length) return;

  const grouped = group(labels.value, (l) => l.labels[0]);

  labelGroups.value = grouped;
}

function selectList(item: string) {
  list.value = item;
}

function mapLabels(item: any) {
  const items = item.labels
    .map((l) => ({
      name: l,
      coefficient: item.scores[item.labels.indexOf(l)],
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
  await revit.getRoomNames();
});
</script>
