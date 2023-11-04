<template>
  <Combobox as="div" v-model="selectedItem">
    <ComboboxLabel class="block text-sm font-medium leading-6 text-gray-900">{{
      label
    }}</ComboboxLabel>
    <div class="relative mt-2">
      <ComboboxInput
        class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        @change="query = $event.target.value"
        :display-value="(person) => person?.name"
      />
      <ComboboxButton
        class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
      >
        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
      </ComboboxButton>

      <ComboboxOptions
        v-if="filteredItems.length > 0"
        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      >
        <ComboboxOption
          v-for="person in filteredItems"
          :key="person.id"
          :value="person"
          as="template"
          v-slot="{ active, selected }"
        >
          <li
            :class="[
              'relative cursor-default select-none py-2 pl-3 pr-9',
              active ? 'bg-indigo-600 text-white' : 'text-gray-900',
            ]"
          >
            <span :class="['block truncate', selected && 'font-semibold']">
              {{ person.name }}
            </span>

            <span
              v-if="selected"
              :class="[
                'absolute inset-y-0 right-0 flex items-center pr-4',
                active ? 'text-white' : 'text-indigo-600',
              ]"
            >
              <CheckIcon class="h-5 w-5" aria-hidden="true" />
            </span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/vue";

type IndexedItem = {
  id: string;
  name: string;
};

const props = defineProps<{
  items: string[];
  label: string;
}>();

const emit = defineEmits<{
  (event: "selected", value: string): void;
}>();

const mappedItems = computed(() =>
  props.items.map((item) => ({ id: item, name: item }))
);

const selectedItem = ref<IndexedItem>(mappedItems.value[0]);

watch(
  () => selectedItem.value,
  (value) => {
    emit("selected", value);
  }
);

let query = ref("");

let filteredItems = computed(() =>
  query.value === ""
    ? mappedItems.value
    : mappedItems.value.filter((item) =>
        item.name.toLowerCase().includes(query.value.toLowerCase())
      )
);
</script>
