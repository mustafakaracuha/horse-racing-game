<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const horses = computed(() => store.state.horses);
</script>

<template>
  <div class="flex flex-col rounded-md border border-gray-200 bg-white shadow-sm">
    <div class="rounded-t-md bg-yellow-300 px-3 py-3 font-semibold">
      Horse List (1 - 20)
    </div>
    <div class="max-h-[600px] overflow-auto">
      <table class="w-full border-collapse text-xs">
        <thead>
          <tr class="bg-gray-100 text-gray-700">
            <th class="border border-gray-200 px-4 py-2 text-left">Name</th>
            <th class="border border-gray-200 px-4 py-2 text-left">
              Condition
            </th>
            <th class="border border-gray-200 px-4 py-2 text-left">Color</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="horse in horses" :key="horse.id">
            <td class="border border-gray-100 px-4 py-2">{{ horse.name }}</td>
            <td class="border border-gray-100 px-4 py-2 font-semibold">
              {{ horse.condition }}
            </td>
            <td class="border border-gray-100 px-4 py-2">
              <span
                class="mr-2 inline-block h-3 w-3 rounded-full border border-gray-300 align-middle"
                :style="{ backgroundColor: horse.colorHex }"
              ></span>
              {{ horse.color }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
