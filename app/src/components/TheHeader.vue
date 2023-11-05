<template>
  <div class="flex justify-between pt-5 items-center">
    <div class="flex items-center">
      <TheLogo class="mr-4" />
      <div class="text-[#065F46] font-bold text-2xl">The Boring App</div>
    </div>
    <RouterLink to="/">
      <Bars3Icon class="h-5 w-5 text-[#065F46]" />
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { Bars3Icon } from "@heroicons/vue/20/solid";
import TheLogo from "./icons/TheLogo.vue";
</script>

<style lang="scss" scoped></style>
