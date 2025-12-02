<script setup>
import HorseList from "./components/List/HorseList.vue";
import TopBar from "./components/Bar/TopBar.vue";
</script>

<template>
  <div class="max-w-7xl h-screen mx-auto flex items-center justify-center">
  <div class="w-full bg-gray-100 flex flex-col items-start justify-start rounded-b-md">
    <TopBar />
    <div class="grid grid-cols-3 gap-4 px-3 py-4">
    <HorseList />
  </div>
</div>
</div>

</template>
