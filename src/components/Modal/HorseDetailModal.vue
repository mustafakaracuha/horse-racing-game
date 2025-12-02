<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const horse = computed(() => store.state.selectedHorse);
const isOpen = computed(() => !!horse.value);

const close = () => {
  store.commit("CLEAR_SELECTED_HORSE");
};
</script>

<template>
  <teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-40 flex items-center justify-center bg-black/40"
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

        <div v-if="horse" class="space-y-3 text-sm">
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
        </div>
      </div>
    </div>
  </teleport>
</template>


