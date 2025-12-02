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
  <div class="h-screen px-3 py-4 overflow-hidden bg-slate-200">
    <div
      class="mx-auto flex h-full w-full flex-col rounded-md bg-gray-100 shadow-md"
    >
      <TopBar />
      <div
        class="grid flex-1 gap-3 px-4 py-4 lg:grid-cols-[330px_minmax(0,1fr)_450px]"
      >
        <HorseList />
        <RaceTrack />
        <ProgramResults />
      </div>
    </div>
  </div>
</template>
