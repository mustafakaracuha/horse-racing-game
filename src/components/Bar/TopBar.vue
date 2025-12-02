<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const raceStatus = computed(() => store.state.raceStatus);

// programı oluşturuyoruz
const generateProgram = () => {
  store.dispatch("generateProgram");
};

// yarışmayı başlatıyoruz veya durduruyoruz
const toggleRace = () => {
  store.dispatch("toggleRace");
};

// start button'ının label'ını oluşturuyoruz
const startButtonLabel = computed(() =>
  raceStatus.value === "running"
    ? "Pause"
    : raceStatus.value === "paused"
      ? "Resume"
      : "Start",
);
</script>

<template>
  <div
    class="flex w-full items-center justify-between rounded-t-md bg-[#e77d6a] px-4 py-3 text-white"
  >
    <h1 class="text-xl font-bold uppercase tracking-wide">Horse Racing</h1>
    <div class="flex items-center gap-3">
      <button
        class="rounded-md cursor-pointer bg-white px-4 py-2 text-sm font-semibold uppercase tracking-wide text-gray-800 shadow-sm transition hover:bg-gray-100"
        @click="generateProgram"
      >
        Generate Program
      </button>
      <button
        class="rounded-md border cursor-pointer border-white/70 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-gray-800 transition hover:bg-gray-50"
        :class="{
          'bg-white text-gray-800 hover:bg-gray-50': raceStatus !== 'running',
          'bg-[#c05748] cursor-not-allowed opacity-60': raceStatus === 'running',
        }"
        :disabled="!store.state.schedule.length"
        @click="toggleRace"
      >
        {{ startButtonLabel }}
      </button>
    </div>
  </div>
</template>
