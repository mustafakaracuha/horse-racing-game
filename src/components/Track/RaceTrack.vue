<template>
  <div
    class="relative rounded-md border border-gray-200 bg-white px-4 py-6 shadow-sm"
  >
    <div
      class="pointer-events-none absolute top-8 bottom-16 right-16 border-l-4 border-red-500"
    ></div>
    <div
      class="pointer-events-none absolute bottom-12 right-12 text-[10px] font-semibold uppercase tracking-wide text-red-500"
    >
      Finish
    </div>
    <div
      class="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-wide text-red-500"
    >
      1st Lap · 1200m
    </div>
    <div class="space-y-2">
      <div
        v-for="(laneNumber, laneIndex) in laneNumbers"
        :key="laneNumber"
        class="flex items-center gap-3"
      >
        <div
          class="flex h-10 w-10 items-center justify-center rounded-md bg-green-700 text-sm font-semibold text-white"
        >
          {{ laneNumber }}
        </div>
        <div
          :class="[
            'relative flex-1 rounded-md bg-slate-100',
            laneIndex !== laneNumbers.length - 1
              ? 'border-b border-dashed border-gray-300 pb-4'
              : '',
          ]"
        >
          <div
            v-if="horseByLane[laneNumber]"
            class="absolute top-1/2 flex -translate-y-1/2 items-center gap-2"
            :style="{ left: computeProgress(horseByLane[laneNumber].progress) }"
          >
            <div class="flex items-center gap-1">
              <span
                class="flex h-8 w-8 items-center justify-center rounded-full text-xs font-black text-white shadow-md"
                :style="{ backgroundColor: horseByLane[laneNumber].colorHex }"
              >
                🐎
              </span>
              <span class="text-[11px] font-semibold text-gray-700">
                {{ horseByLane[laneNumber].name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const laneNumbers = Array.from({ length: 10 }, (_, index) => index + 1);

const props = defineProps({
  horses: {
    type: Array,
    required: true,
  },
});

const horseByLane = computed(() => {
  const mapping = {};
  props.horses.forEach((horse) => {
    if (horse.lane) {
      mapping[horse.lane] = horse;
    }
  });
  return mapping;
});

const computeProgress = (progress = 0) => {
  const safeProgress = Math.min(Math.max(progress, 0), 100);
  return `calc(${safeProgress}% - 20px)`;
};
</script>
