<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const schedule = computed(() => store.state.schedule);
const resultsByRound = computed(() => {
  const map = {};
  store.state.results.forEach((round) => {
    map[round.roundId] = round;
  });
  return map;
});

const formatRoundLabel = (roundId, distance) => {
  const suffix =
    roundId === 1
      ? "st"
      : roundId === 2
        ? "nd"
        : roundId === 3
          ? "rd"
          : "th";
  return `${roundId}${suffix} Lap • ${distance}m`;
};
</script>

<template>
  <div class="flex flex-col rounded-md border border-gray-300 bg-white shadow-sm">
    <div
      class="grid border-b border-gray-300 bg-gray-50 px-5 py-3 text-[13px] font-bold uppercase tracking-wide text-gray-800 md:grid-cols-2"
    >
      <span class="text-center md:text-left">Program</span>
      <span class="text-center md:text-left">Results</span>
    </div>
    <div
      class="grid gap-5 px-5 py-4 md:grid-cols-2"
    >
      <div class="space-y-4">
        <div
          v-for="round in schedule"
          :key="round.id"
          class="overflow-hidden rounded-md border border-blue-300 bg-white"
        >
          <div
            class="rounded-t-md bg-blue-600 px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-white"
          >
            {{ formatRoundLabel(round.id, round.distance) }}
          </div>
          <div class="max-h-40 overflow-auto text-[11px]">
            <table class="w-full border-collapse">
              <thead class="bg-blue-50 text-blue-900">
                <tr>
                  <th class="w-14 border border-blue-100 px-2 py-1 text-left">
                    Position
                  </th>
                  <th class="border border-blue-100 px-2 py-1 text-left">
                    Name
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(horse, index) in round.participants"
                  :key="horse.id"
                  class="odd:bg-white even:bg-blue-50/40"
                >
                  <td
                    class="border border-blue-100 px-2 py-1 text-[11px] font-semibold"
                  >
                    {{ index + 1 }}
                  </td>
                  <td class="border border-blue-100 px-2 py-1 text-[11px]">
                    {{ horse.name }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="space-y-4">
        <div
          v-for="round in schedule"
          :key="`result-${round.id}`"
          class="overflow-hidden rounded-md border border-green-300 bg-white"
        >
          <div
            class="rounded-t-md bg-green-600 px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-white"
          >
            {{ formatRoundLabel(round.id, round.distance) }}
          </div>
          <div class="max-h-40 overflow-auto text-[11px]">
            <table class="w-full border-collapse">
              <thead class="bg-green-50 text-green-900">
                <tr>
                  <th class="w-14 border border-green-100 px-2 py-1 text-left">
                    Position
                  </th>
                  <th class="border border-green-100 px-2 py-1 text-left">
                    Name
                  </th>
                </tr>
              </thead>
              <tbody v-if="resultsByRound[round.id]">
                <tr
                  v-for="placement in resultsByRound[round.id].placements"
                  :key="placement.id"
                  class="odd:bg-white even:bg-green-50/40"
                >
                  <td
                    class="border border-green-100 px-2 py-1 text-[11px] font-semibold"
                  >
                    {{ placement.position }}
                  </td>
                  <td class="border border-green-100 px-2 py-1 text-[11px]">
                    {{ placement.name }}
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td
                    colspan="2"
                    class="border border-green-100 px-2 py-4 text-center text-gray-500"
                  >
                    Waiting for finish...
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

