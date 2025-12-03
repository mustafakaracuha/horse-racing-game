<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import horseIcon from "../../assets/horse.svg";

const store = useStore();
const laneNumbers = Array.from({ length: 10 }, (_, index) => index + 1);

const currentRound = computed(() => store.getters.currentRound);
const raceStatus = computed(() => store.state.raceStatus);
const trackHorses = computed(() => store.state.trackHorses);

// atların kulvarlarda sıralanmasını sağlıyoruz
const horsesByLane = computed(() =>
  laneNumbers.reduce((map, lane, index) => {
    map[lane] = trackHorses.value[index] || null;
    return map;
  }, {}),
);

// track label'ını oluşturuyoruz
const trackLabel = computed(() => {
  if (!currentRound.value) return "Waiting for schedule";
  const suffix =
    currentRound.value.id === 1
      ? "st"
      : currentRound.value.id === 2
        ? "nd"
        : currentRound.value.id === 3
          ? "rd"
          : "th";
  return `${currentRound.value.id}${suffix} Lap • ${currentRound.value.distance}m`;
});

// atların ilerlemesini güncelliyoruz
const computeProgress = (progress = 0) => {
  const clamped = Math.min(Math.max(progress, 0), 85);
  return `calc(${clamped}% - 50px)`;
};

// atların ilk harfini alıyoruz
const getInitial = (value = "") => (value ? value.charAt(0) : "?");
</script>

<template>
  <div class="flex flex-col rounded-t-md border border-gray-200 bg-white shadow-sm">
    <div class="rounded-t-md flex items-center justify-between bg-slate-800 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white">
      Race Progress
      <span class="ml-2 text-xs font-normal text-gray-200">
        {{ trackLabel }}
      </span>
    </div>
    <div class="relative overflow-hidden px-4 py-6">
      <div
        class="absolute inset-y-4 right-10 w-1 z-10 rounded-full bg-red-500"
        aria-hidden="true"
      ></div>
      <div class="space-y-3">
        <div
          v-for="laneNumber in laneNumbers"
          :key="laneNumber"
          class="flex items-center gap-3"
        >
          <div
            class="flex h-10 w-10 -rotate-90 items-center justify-center rounded-md bg-green-700 text-sm font-semibold text-white"
          >
            {{ laneNumber }}
          </div>
          <div
            class="relative flex-1 rounded-md bg-slate-100 pb-3"
          >
            <div
              class="absolute inset-y-1/2 left-0 right-0 -translate-y-1/2 border-t border-dashed border-gray-400"
            ></div>
            <div
              v-if="horsesByLane[laneNumber]"
              class="absolute top-1/2 flex -translate-y-1/2 items-center gap-2 transition-all"
              :style="{ left: computeProgress(horsesByLane[laneNumber].progress) }"
              @click="$store.commit('SET_SELECTED_HORSE', horsesByLane[laneNumber])"
            >
              <div
                class="flex items-center gap-1 cursor-pointer hover:bg-gray-100 rounded-full bg-white/90 px-2.5 py-1 shadow"
              >
                <span
                  class="inline-flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 text-[9px] font-bold text-white"
                  :style="{ backgroundColor: horsesByLane[laneNumber].colorHex }"
                >
                  {{ getInitial(horsesByLane[laneNumber].name) }}
                </span>
                <img
                  :src="horseIcon"
                  alt="horse"
                  class="h-5 w-5"
                  :style="{ filter: `drop-shadow(0 0 4px ${horsesByLane[laneNumber].colorHex})` }"
                />
                <span
                  class="max-w-[120px] truncate text-[11px] font-semibold text-gray-700"
                >
                  {{ horsesByLane[laneNumber].name }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="raceStatus === 'completed'"
        class="mt-6 text-center text-sm font-semibold text-green-600"
      >
      The race is over! Create a new one for another race.
      </div>
    </div>
  </div>
</template>
