<template>
  <Menu as="div" class="relative inline-block">
    <div>
      <MenuButton
        class="bg-green-200 text-green-800 rounded-full px-2 w-32 truncate absolute"
      >
        {{ label }}
        dsasd
        <ChevronDownIcon
          class="-mr-1 h-5 w-5 text-gray-400 absolute right-1.5 bg-white"
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
          <MenuItem v-if="Number(item.coefficient) > 0.5">
            <div
              class="rounded-full w-full truncate bg-green-200 text-center text-xs font-semibold"
            >
              <!-- {{ item.coefficient }} -->
              {{ item.name }}
            </div>
          </MenuItem>
          <MenuItem v-else>
            <div
              class="rounded-full w-full truncate bg-yellow-200 text-center text-xs font-semibold"
            >
              {{ item.name }}
            </div>
          </MenuItem>
          <!-- <MenuItem >
            <div
              class="rounded-full w-full truncate bg-green-200 text-center text-xs font-semibold"
            >
              {{ item.name }}
            </div>
          </MenuItem> -->
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";

const props = defineProps<{
  label: string;
  items: { name: string; coefficient: number }[];
}>();
</script>
