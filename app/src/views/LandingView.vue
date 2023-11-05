<template>
  <div>
    <div
      class="absolute top-0 h-[300px] w-full bg-gradient-to-b from-green-100 to-white -z-10"
    />
    <div
      class="flex flex-col w-full text-[#065F46] h-screen justify-center items-center text-5xl font-semibold"
    >
      <VueTyper
        :text="['Naming', 'Labelling', 'Tagging', 'Classifying']"
        initial-action="erasing"
        class="text-[#065F46]"
      ></VueTyper>
      <span>is boring.</span>
      <RouterLink to="/home">
        <button
          type="button"
          class="mt-6 rounded-full bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
          Get started
        </button>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import VueTyper from "vue3-typer";
import "vue3-typer/dist/vue-typer.css";
</script>
