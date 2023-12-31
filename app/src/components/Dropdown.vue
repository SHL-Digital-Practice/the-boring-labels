<template>
  <Menu as="div" class="relative inline-block">
    <div>
      <MenuButton>
        <Pill
          :coefficient="items[0].coefficient"
          :label="items[0].name"
          class="text-left text-xs px-3 py-1"
        />
        <ChevronDownIcon
          class="-mr-1 h-5 w-5 top-1 text-green-800 absolute right-2"
          aria-hidden="true"
        />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute right-0 px-1.5 top-7 z-10 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-xl ring ring-gray-50 ring-opacity-30 focus:outline-none"
      >
        <div class="py-1" v-for="item in items">
          <div
            class="flex text-gray-400 space-x-1 p-0.5 cursor-pointer items-center"
          >
            <Pill
              :label="item.name"
              :coefficient="item.coefficient"
              @selected="(e) => updateLabel(e, item)"
            />
            <p class="text-xs">{{ Math.round(item.coefficient * 100) }}%</p>
          </div>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import Pill from "./Pill.vue";
import { useLabelsStore } from "@/stores/labels";

const props = defineProps<{
  items: {
    name: string;
    coefficient: number;
    elementId: string;
  }[];
}>();

const store = useLabelsStore();

function updateLabel(
  newName: string,
  item: {
    name: string;
    coefficient: number;
    elementId: string;
  }
) {
  const label = store.labels.find((l) => l.elementId === item.elementId);

  label?.labels.splice(label?.labels.indexOf(item.name), 1);
  label?.scores.splice(label?.labels.indexOf(item.name), 1);

  label?.labels.unshift(newName);
  label?.scores.unshift(1);
}
</script>
