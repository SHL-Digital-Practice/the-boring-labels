<template>
  <Menu as="div" class="relative inline-block">
    <div>
      <MenuButton
        class="bg-green-200 text-green-800 rounded-full px-2 w-32 truncate absolute"
      >
        {{ items[0].name }}
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
        class="absolute right-0 top-7 z-10 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="py-1" v-for="item in items">
          <div>
            <Pill
              :label="item.name"
              :coefficient="item.coefficient"
              @selected="updateLabel"
            />
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

const props = defineProps<{
  items: {
    name: string;
    coefficient: number;
  }[];
}>();

function updateLabel(item: string) {}
</script>
