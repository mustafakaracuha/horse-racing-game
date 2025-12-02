<script setup>
import HorseList from "./components/List/HorseList.vue";
import TopBar from "./components/Bar/TopBar.vue";
import RaceTrack from "./components/Track/RaceTrack.vue";

const horses = [
  {
    id: 1,
    lane: 1,
    name: "Thunderbolt",
    condition: 87,
    color: "Jet Black",
    colorHex: "#111827",
    progress: 94,
  },
  {
    id: 2,
    lane: 2,
    name: "Lightning Strike",
    condition: 92,
    color: "Sunset Orange",
    colorHex: "#ea580c",
    progress: 78,
  },
  {
    id: 3,
    lane: 3,
    name: "Midnight Runner",
    condition: 78,
    color: "Midnight Indigo",
    colorHex: "#4338ca",
    progress: 64,
  },
  {
    id: 4,
    lane: 4,
    name: "Golden Arrow",
    condition: 65,
    color: "Goldenrod",
    colorHex: "#d97706",
    progress: 52,
  },
  {
    id: 5,
    lane: 5,
    name: "Silver Storm",
    condition: 84,
    color: "Steel Gray",
    colorHex: "#64748b",
    progress: 58,
  },
  {
    id: 6,
    lane: 6,
    name: "Wild Fire",
    condition: 95,
    color: "Crimson",
    colorHex: "#dc2626",
    progress: 72,
  },
  {
    id: 7,
    lane: 7,
    name: "Ocean Wave",
    condition: 71,
    color: "Deep Teal",
    colorHex: "#0d9488",
    progress: 63,
  },
  {
    id: 8,
    lane: 8,
    name: "Desert Wind",
    condition: 58,
    color: "Sandstone",
    colorHex: "#ca8a04",
    progress: 47,
  },
  {
    id: 9,
    lane: 9,
    name: "Mountain Peak",
    condition: 89,
    color: "Forest",
    colorHex: "#065f46",
    progress: 38,
  },
  {
    id: 10,
    lane: 10,
    name: "Storm Chaser",
    condition: 76,
    color: "Royal Violet",
    colorHex: "#7c3aed",
    progress: 22,
  },
];
</script>

<template>
  <div class="max-w-7xl min-h-screen mx-auto flex items-center justify-center px-3 py-6">
    <div class="w-full bg-gray-100 flex flex-col rounded-md shadow-sm">
      <TopBar />
      <div class="grid gap-6 px-3 py-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <HorseList :horses="horses" />
        <RaceTrack :horses="horses" />
      </div>
    </div>
  </div>
</template>
