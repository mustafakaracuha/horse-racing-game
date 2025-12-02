import { describe, it, expect, beforeEach } from "vitest";
import store from "../src/store/index.js";

describe("Vuex store - horse racing logic", () => {
  beforeEach(async () => {
    // Her testten önce yeni bir program üretelim
    await store.dispatch("generateProgram");
  });

  it("generateProgram 20 at ve 6 tur üretir, her turda 10 at vardır", () => {
    const { horses, schedule } = store.state;

    expect(horses.length).toBe(20);

    // condition 1-100 aralığında mı?
    for (const horse of horses) {
      expect(horse.condition).toBeGreaterThanOrEqual(1);
      expect(horse.condition).toBeLessThanOrEqual(100);
    }

    expect(schedule.length).toBe(6);
    for (const round of schedule) {
      expect(round.participants.length).toBe(10);

      // katılımcılar 20 atlık havuzdan geliyor mu?
      for (const participant of round.participants) {
        const exists = horses.find((h) => h.id === participant.id);
        expect(exists).toBeTruthy();
      }
    }
  });

  it("endCurrentRound sonucu hesaplayıp sonuçlar listesine yazar", async () => {
    // İlk turu hazırlayıp pistteki atları manuel bitmiş gibi işaretleyelim
    await store.dispatch("beginRound", 0);

    // Sahte bitiş sıraları verelim
    const fakeTrack = store.state.trackHorses.map((horse, index) => ({
      ...horse,
      progress: 100,
      finishTick: index + 1, // index küçük olan daha erken bitirmiş olsun
    }));

    store.commit("SET_TRACK_HORSES", fakeTrack);

    await store.dispatch("endCurrentRound");

    const resultForFirstRound = store.state.results.find(
      (r) => r.roundId === 1,
    );

    expect(resultForFirstRound).toBeTruthy();
    expect(resultForFirstRound.placements.length).toBe(10);

    // position alanı 1'den başlayarak artmalı
    resultForFirstRound.placements.forEach((p, idx) => {
      expect(p.position).toBe(idx + 1);
    });
  });
});


