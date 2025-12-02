<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

// seçilen atın detaylarını görüntülemek için
const horse = computed(() => store.state.selectedHorse);
// seçilen atın detaylarının açık olup olmadığını kontrol etmek için
const isOpen = computed(() => !!horse.value);

// atın bu "cup" içindeki yarış performans özetini hesaplıyoruz
const participationSummary = computed(() => {
  if (!horse.value) return null;

  const schedule = store.state.schedule || [];
  const results = store.state.results || [];

  // atın koştuğu turlarını alıyoruz
  const races = schedule
    .map((round) => {
      const inProgram = round.participants.find((h) => h.id === horse.value.id);
      if (!inProgram) return null;

      // o tur için pozisyonu varsa alma
      const resultForRound = results.find((r) => r.roundId === round.id);
      const placement = resultForRound
        ? resultForRound.placements.find((p) => p.id === horse.value.id)
        : null;

      return {
        roundId: round.id,
        distance: round.distance,
        position: placement ? placement.position : null,
      };
    })
    .filter(Boolean);

  // eğer atın koştuğu turları yoksa, yarışma özetini döndürüyoruz
  if (!races.length) {
    return {
      totalRaces: 0,
      wins: 0,
      bestPosition: null,
      races: [],
    };
  }

  // özetin sonuçlarını hesaplıyoruz
  const finishedRaces = races.filter((r) => r.position !== null);
  const wins = finishedRaces.filter((r) => r.position === 1).length;
  const bestPosition = finishedRaces.length
    ? Math.min(...finishedRaces.map((r) => r.position))
    : null;

  return {
    totalRaces: races.length,
    wins,
    bestPosition,
    races: finishedRaces,
  };
});

// at detaylarını kapatıyoruz
const close = () => {
  store.commit("CLEAR_SELECTED_HORSE");
};
</script>

<template>
  <teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-40 flex items-center justify-center bg-black/30"
      @click.self="close"
    >
      <div
        class="w-full max-w-sm rounded-md bg-white p-5 shadow-xl ring-1 ring-black/5"
      >
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-sm font-semibold uppercase tracking-wide text-gray-700">
            Horse Details
          </h2>
          <button
            class="text-xs cursor-pointer font-semibold uppercase tracking-wide text-gray-500 hover:text-gray-800"
            @click="close"
          >
            X
          </button>
        </div>

        <div v-if="horse" class="space-y-4 text-sm">
          <div class="flex items-center gap-3">
            <span
              class="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-xs font-bold text-white"
              :style="{ backgroundColor: horse.colorHex }"
            >
              {{ horse.name.charAt(0) }}
            </span>
            <div>
              <div class="text-sm font-semibold text-gray-900">
                {{ horse.name }}
              </div>
              <div class="text-xs text-gray-500">
                Color:
                <span class="font-medium">{{ horse.color }}</span>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2 text-xs">
            <div class="rounded-md bg-gray-50 p-2">
              <div class="text-[11px] uppercase text-gray-500">Condition</div>
              <div class="text-sm font-semibold text-gray-900">
                {{ horse.condition }}
              </div>
            </div>

            <div class="rounded-md bg-gray-50 p-2">
              <div class="text-[11px] uppercase text-gray-500">Id</div>
              <div class="text-sm font-semibold text-gray-900">
                #{{ horse.id }}
              </div>
            </div>
          </div>

          <div v-if="participationSummary" class="space-y-2 text-xs">
            <div
              class="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2"
            >
              <div>
                <div class="text-[11px] uppercase text-gray-500">
                  Race Summary
                </div>
                <div class="text-[11px] text-gray-700">
                  {{ participationSummary.totalRaces }} lap(s) in current cup
                </div>
              </div>
              <div class="text-right">
                <div class="text-[11px] text-gray-500">
                  Wins
                </div>
                <div class="text-sm font-semibold text-emerald-600">
                  {{ participationSummary.wins }}
                </div>
              </div>
            </div>

            <div
              v-if="participationSummary.races.length"
              class="max-h-40 overflow-y-auto rounded-md border border-gray-100"
            >
              <table class="w-full border-collapse text-[11px]">
                <thead class="bg-gray-50 text-gray-600">
                  <tr>
                    <th class="border-b border-gray-100 px-2 py-1 text-left">
                      Lap
                    </th>
                    <th class="border-b border-gray-100 px-2 py-1 text-left">
                      Distance
                    </th>
                    <th class="border-b border-gray-100 px-2 py-1 text-left">
                      Position
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="race in participationSummary.races"
                    :key="race.roundId"
                    class="odd:bg-white even:bg-gray-50/60"
                  >
                    <td class="px-2 py-1">
                      {{ race.roundId }}
                    </td>
                    <td class="px-2 py-1">
                      {{ race.distance }}m
                    </td>
                    <td class="px-2 py-1">
                      {{ race.position }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>


