<script setup>
import { onMounted } from "vue";
import { useStore } from "vuex";
import HorseList from "./components/List/HorseList.vue";
import TopBar from "./components/Bar/TopBar.vue";
import RaceTrack from "./components/Track/RaceTrack.vue";
import ProgramResults from "./components/Program/ProgramResults.vue";

const store = useStore();

onMounted(() => {
  if (!store.state.schedule.length) {
    store.dispatch("generateProgram");
  }
});
</script>

<template>
  <div class="min-h-screen bg-slate-200 px-3 py-6">
    <div
      class="mx-auto flex w-full max-w-[1500px] flex-col rounded-md bg-gray-100 shadow-md"
    >
      <TopBar />
      <div
        class="grid gap-4 px-4 py-6 lg:grid-cols-[300px_minmax(0,1fr)_320px]"
      >
        <HorseList />
        <RaceTrack />
        <ProgramResults />
      </div>
    </div>
  </div>
</template>
