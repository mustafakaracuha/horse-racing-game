<template>
  <div class="flex flex-col rounded-md border border-gray-200 bg-white shadow-sm">
    <div class="bg-yellow-300 font-semibold px-3 py-3 rounded-t-md">
      Horse List
    </div>
    <div class="overflow-auto max-h-[600px]">
      <table class="w-full border-collapse text-xs">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-200 px-4 py-2 text-left">Name</th>
            <th class="border border-gray-200 px-4 py-2 text-left">
              Condition
            </th>
            <th class="border border-gray-200 px-4 py-2 text-left">Color</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="horse in horses" :key="horse.id">
            <td class="border border-gray-200 px-4 py-2">{{ horse.name }}</td>
            <td class="border border-gray-200 px-4 py-2">
              {{ horse.condition }}
            </td>
            <td class="border border-gray-200 px-4 py-2">
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

<script setup>
defineProps({
  horses: {
    type: Array,
    required: true,
  },
});
</script>
