<template>
  <div class="flex flex-col rounded-md">
    <div class="bg-yellow-300 font-semibold px-2 py-2.5 rounded-t-md">
      Horse List (1-20)
    </div>
    <div class="bg-white overflow-auto max-h-[600px]">
      <table class="w-full border-collapse text-xs">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th class="border border-gray-300 px-4 py-2 text-left">
              Condition
            </th>
            <th class="border border-gray-300 px-4 py-2 text-left">Color</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="horse in horses" :key="horse.id">
            <td class="border border-gray-300 px-4 py-2">{{ horse.name }}</td>
            <td class="border border-gray-300 px-4 py-2">
              {{ horse.condition }}
            </td>
            <td class="border border-gray-300 px-4 py-2">{{ horse.color }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "HorseList",
  data() {
    return {
      horses: [
        { id: 1, name: "Thunderbolt", condition: 87, color: "Black" },
        { id: 2, name: "Lightning Strike", condition: 92, color: "Brown" },
        { id: 3, name: "Midnight Runner", condition: 78, color: "Dark Brown" },
        { id: 4, name: "Golden Arrow", condition: 65, color: "Chestnut" },
        { id: 5, name: "Silver Storm", condition: 84, color: "Gray" },
        { id: 6, name: "Wild Fire", condition: 95, color: "Bay" },
        { id: 7, name: "Ocean Wave", condition: 71, color: "Roan" },
        { id: 8, name: "Desert Wind", condition: 58, color: "Palomino" },
        { id: 9, name: "Mountain Peak", condition: 89, color: "Black" },
        { id: 10, name: "Storm Chaser", condition: 76, color: "Brown" },
        { id: 11, name: "Royal Crown", condition: 93, color: "Chestnut" },
        { id: 12, name: "Wind Rider", condition: 82, color: "Gray" },
        { id: 13, name: "Fire Spirit", condition: 69, color: "Bay" },
        { id: 14, name: "Star Gazer", condition: 88, color: "Black" },
        { id: 15, name: "Moon Shadow", condition: 74, color: "Dark Brown" },
        { id: 16, name: "Sun Dancer", condition: 91, color: "Palomino" },
        { id: 17, name: "River Flow", condition: 63, color: "Roan" },
        { id: 18, name: "Sky Runner", condition: 85, color: "Gray" },
        { id: 19, name: "Earth Mover", condition: 72, color: "Brown" },
        { id: 20, name: "Diamond Star", condition: 96, color: "Chestnut" },
      ],
    };
  },
};
</script>
