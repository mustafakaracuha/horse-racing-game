import { createStore } from "vuex";

// yarışmanın mesafelerini belirliyoruz
const ROUND_DISTANCES = [1200, 1400, 1600, 1800, 2000, 2200];

// atların isimlerini belirliyoruz
const HORSE_NAMES = [
  "Ada Lovelace",
  "Grace Hopper",
  "Margaret Hamilton",
  "Katherine Johnson",
  "Dorothy Vaughan",
  "Joan Clarke",
  "Annie Easley",
  "Karen Spärck Jones",
  "Hedy Lamarr",
  "Bold Pilot",
  "Evelyn Boyd Granville",
  "Gladys West",
  "Mary Jackson",
  "Frances Allen",
  "Barbara Liskov",
  "Radia Perlman",
  "Sophie Wilson",
  "Megan Smith",
  "Shafi Goldwasser",
  "Fei-Fei Li",
];

// atların renklerini belirliyoruz
const HORSE_COLORS = [
  { label: "Crimson", hex: "#dc2626" },
  { label: "Cobalt", hex: "#1d4ed8" },
  { label: "Amber", hex: "#d97706" },
  { label: "Forest", hex: "#065f46" },
  { label: "Magenta", hex: "#c026d3" },
  { label: "Indigo", hex: "#4338ca" },
  { label: "Teal", hex: "#0f766e" },
  { label: "Rose", hex: "#e11d48" },
  { label: "Slate", hex: "#475569" },
  { label: "Gold", hex: "#a16207" },
  { label: "Copper", hex: "#b45309" },
  { label: "Lilac", hex: "#7c3aed" },
  { label: "Mint", hex: "#059669" },
  { label: "Azure", hex: "#0369a1" },
  { label: "Coral", hex: "#f97316" },
  { label: "Chartreuse", hex: "#65a30d" },
  { label: "Saffron", hex: "#facc15" },
  { label: "Ruby", hex: "#be123c" },
  { label: "Plum", hex: "#7e22ce" },
  { label: "Cerulean", hex: "#0ea5e9" },
];

const initialState = () => ({
  horses: [], // atların listesi
  schedule: [], // yarışma programının listesi
  currentRoundIndex: -1, // geçerli turun index'i
  trackHorses: [], // pistte koşan atların listesi
  results: [], // her tur için sonuçların listesi
  raceStatus: "idle", // idle | ready | running | paused | completed (yarışmanın durumu)
  intervalId: null, // animasyon döngüsünün interval id'si
  tickCount: 0, // animasyon tiker sayacı; bitiş sıralamasını hesaplamak için kullanılır
  selectedHorse: null, // seçilen atın detaylarını görüntülemek için kullanılır
});

// atların listesini oluşturuyoruz
const createHorseRoster = () =>
  HORSE_NAMES.map((name, index) => {
    const color = HORSE_COLORS[index];
    return {
      id: index + 1,
      name,
      condition: Math.floor(Math.random() * 100) + 1,
      color: color.label,
      colorHex: color.hex,
    };
  });

  // her tur için rastgele 10 at seçiyoruz (aynı atın tekrar seçilmesini engelliyoruz)
const pickRandomParticipants = (horses, amount) => {
  const pool = [...horses]; // orijinal diziyi kopyalıyoruz
  const selected = [];
  
  // İstenen sayıda veya pool'da kalan at sayısı kadar seçim yapıyoruz
  const selectCount = Math.min(amount, pool.length);
  
  for (let i = 0; i < selectCount; i++) {
    // Pool'dan rastgele bir index seçiyoruz
    const randomIndex = Math.floor(Math.random() * pool.length);
    // Seçilen atı pool'dan çıkarıp selected dizisine ekliyoruz
    // splice kullanarak aynı atın tekrar seçilmesini engelliyoruz
    const selectedHorse = pool.splice(randomIndex, 1)[0];
    selected.push(selectedHorse);
  }
  
  return selected;
};

// mesafe faktörünü hesaplıyoruz (mesafe arttıkça progress daha yavaş artar)
const calculateDistanceFactor = (distance) => {
  // En kısa mesafe 1200m'yi referans alıyoruz
  // Mesafe arttıkça faktör azalır, böylece finish süreleri uzar
  const baseDistance = 1200;
  return baseDistance / distance;
};

const prepareTrackHorse = (horse, distance) => ({
  ...horse,
  progress: 0,
  finishTick: null,
  speedFactor: 0.4 + horse.condition / 100, // atları biraz yavaşlatıyoruz
  distanceFactor: calculateDistanceFactor(distance), // mesafe faktörü (mesafe arttıkça azalır)
});

export default createStore({
  state: initialState,
  getters: {
    currentRound(state) {
      return state.schedule[state.currentRoundIndex] || null;
    },
  },
  mutations: {
    // state'i sıfırlıyoruz
    RESET_STATE(state) {
      const preservedSchedule = state.schedule;
      const preservedHorses = state.horses;
      Object.assign(state, initialState());
      state.schedule = preservedSchedule;
      state.horses = preservedHorses;
    },
    SET_HORSES(state, horses) {
      state.horses = horses;
    },
    SET_SCHEDULE(state, schedule) {
      state.schedule = schedule;
    },
    // race status'u ayarlıyoruz (idle | ready | running | paused | completed)
    SET_RACE_STATUS(state, status) {
      state.raceStatus = status;
    },
    // current tur index'i ayarlıyoruz (0'dan başlayarak)
    SET_CURRENT_ROUND_INDEX(state, index) {
      state.currentRoundIndex = index;
    },
    SET_TRACK_HORSES(state, horses) {
      state.trackHorses = horses;
    },
    UPDATE_TRACK_HORSES(state, updater) {
      state.trackHorses = updater(state.trackHorses);
    },
    // interval id'yi ayarlıyoruz
    SET_INTERVAL_ID(state, id) {
      state.intervalId = id;
    },
    // interval id'yi temizliyoruz
    CLEAR_INTERVAL_ID(state) {
      if (state.intervalId) {
        clearInterval(state.intervalId);
        state.intervalId = null;
      }
    },
    // sonuçları kaydediyoruz
    PUSH_RESULT(state, payload) {
      const existingIndex = state.results.findIndex(
        (res) => res.roundId === payload.roundId,
      );
      if (existingIndex >= 0) {
        state.results.splice(existingIndex, 1, payload);
      } else {
        state.results.push(payload);
      }
    },
    RESET_RESULTS(state) {
      state.results = [];
    },
    SET_TICK_COUNT(state, tick) {
      state.tickCount = tick;
    },
    SET_SELECTED_HORSE(state, horse) {
      state.selectedHorse = horse;
    },
    CLEAR_SELECTED_HORSE(state) {
      state.selectedHorse = null;
    },
  },
  actions: {
    // programı oluşturuyoruz
    generateProgram({ commit }) {
      const horses = createHorseRoster();
      const usedHorseIds = new Set(); // önceki turlarda kullanılan atların ID'lerini takip ediyoruz
      
      // her tur için rastgele 10 at seçiyoruz
      const schedule = ROUND_DISTANCES.map((distance, index) => {
        // Önceki turlarda kullanılmamış atları tercih ediyoruz
        const unusedHorses = horses.filter(horse => !usedHorseIds.has(horse.id));
        const availableHorses = unusedHorses.length >= 10 
          ? unusedHorses 
          : horses; // Eğer yeterli kullanılmamış at yoksa, tüm atları kullan
        
        const selected = pickRandomParticipants(availableHorses, 10);
        
        // Seçilen atların ID'lerini kullanılanlar listesine ekliyoruz
        selected.forEach(horse => usedHorseIds.add(horse.id));
        
        return {
          id: index + 1,
          distance,
          participants: selected.map((horse) => ({
            ...horse,
          })),
        };
      });

      commit("SET_HORSES", horses);
      commit("SET_SCHEDULE", schedule);
      commit("RESET_RESULTS");
      commit("CLEAR_INTERVAL_ID");
      commit("SET_TRACK_HORSES", []);
      commit("SET_CURRENT_ROUND_INDEX", -1);
      commit("SET_RACE_STATUS", "ready");
    },

    // yarışmayı başlatıyoruz veya durduruyoruz
    toggleRace({ state, dispatch }) {
      if (!state.schedule.length) {
        dispatch("generateProgram");
        return;
      }
      if (state.raceStatus === "running") {
        dispatch("pauseRace");
      } else {
        dispatch("startRace");
      }
    },

    // yarışmayı başlatıyoruz
    startRace({ state, commit, dispatch }) {
      if (!state.schedule.length) {
        dispatch("generateProgram");
        return;
      }
      if (state.raceStatus === "completed") {
        // tekrar başlangıça dön
        commit("SET_CURRENT_ROUND_INDEX", -1);
        commit("RESET_RESULTS");
      }
      if (state.currentRoundIndex === -1) {
        dispatch("beginRound", 0);
      } else if (state.raceStatus === "paused") {
        dispatch("resumeRound");
      }
    },

    // turu başlatıyoruz
    beginRound({ state, commit, dispatch }, index) {
      if (index >= state.schedule.length) {
        commit("SET_RACE_STATUS", "completed");
        return;
      }
      const round = state.schedule[index];
      const prepared = round.participants.map((horse) => prepareTrackHorse(horse, round.distance));

      commit("SET_CURRENT_ROUND_INDEX", index);
      commit("SET_TRACK_HORSES", prepared);
      commit("SET_TICK_COUNT", 0);
      commit("SET_RACE_STATUS", "running");

      dispatch("runRoundLoop");
    },

    // turu güncelliyoruz
    runRoundLoop({ state, commit, dispatch }) {
      commit("CLEAR_INTERVAL_ID");
      const intervalId = setInterval(() => {
        // tick count'u güncelliyoruz (animasyonu güncelliyoruz)
        commit("SET_TICK_COUNT", state.tickCount + 1);
        let finishedCount = 0;
        // atların ilerlemesini güncelliyoruz
        commit("UPDATE_TRACK_HORSES", (horses) =>
          horses.map((horse) => {
            // eğer atın finish tick'i null değilse, atın bitişine geldiğini belirtiyoruz
            if (horse.finishTick !== null) {
              finishedCount += 1;
              return horse;
            }
            const baseIncrement = 1 + Math.random() * 2;
            // Mesafe faktörünü kullanarak mesafe arttıkça progress daha yavaş artar
            // Örnek: 1200m için factor=1.0, 2200m için factor≈0.545
            const progress = Math.min(
              100,
              horse.progress + baseIncrement * horse.speedFactor * (horse.distanceFactor || 1),
            );
            // eğer atın progress'i 100'e ulaştıysa ve finish tick'i null ise, atın bitişine geldiğini belirtiyoruz
            const finishTick =
              progress >= 100 && horse.finishTick === null
                ? state.tickCount
                : horse.finishTick;
            if (finishTick !== null) {
              finishedCount += 1;
            }
            return {
              ...horse,
              progress,
              finishTick,
            };
          }),
        );
        // eğer tüm atlar finish çizgisine geldiyse turu bitiriyoruz
        if (finishedCount === state.trackHorses.length) {
          dispatch("endCurrentRound");
        }
      }, 80);

      commit("SET_INTERVAL_ID", intervalId);
    },

    pauseRace({ commit }) {
      commit("CLEAR_INTERVAL_ID");
      commit("SET_RACE_STATUS", "paused");
    },

    resumeRound({ commit, dispatch }) {
      commit("SET_RACE_STATUS", "running");
      dispatch("runRoundLoop");
    },

    endCurrentRound({ state, commit, dispatch }) {
      commit("CLEAR_INTERVAL_ID");
      if (!state.trackHorses.length) return;

      // atların bitiş sırasını belirliyoruz
      const placements = [...state.trackHorses]
        .map((horse) => ({
          id: horse.id,
          name: horse.name,
          color: horse.color,
          colorHex: horse.colorHex,
          finishTick: horse.finishTick ?? Number.MAX_SAFE_INTEGER,
        }))
        .sort((a, b) => a.finishTick - b.finishTick)
        .map((horse, index) => ({
          position: index + 1,
          ...horse,
        }));

      const round = state.schedule[state.currentRoundIndex];
      // sonuçları kaydediyoruz
      commit("PUSH_RESULT", {
        roundId: round.id,
        distance: round.distance,
        placements,
      });

      const nextIndex = state.currentRoundIndex + 1;

      if (nextIndex <= state.schedule.length - 1) {
        // bir sonraki tura geçiş yapıyoruz
        dispatch("beginRound", nextIndex);
      } else {
        commit("SET_RACE_STATUS", "completed");
      }
    },
  },
});

