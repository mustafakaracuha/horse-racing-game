## Horse Racing Game

Bu proje, **20 atlık bir havuzdan 6 turluk yarış programı üreten**, her turda **10 farklı atı rastgele seçip animasyonlu olarak koşturan** bir **Vue 3 + Vuex** uygulamasıdır. Amaç hem oyun mekaniğini, hem de bileşen bazlı mimariyi ve durum yönetimini göstermek.

### Özellikler

- **20 atlık havuz**
  - Her atın:
    - **İsim** (tarihsel kadın bilgisayar bilimcilerden seçilmiş),
    - 1–100 arası **condition** skoru,
    - Benzersiz **renk** etiketi (`color`, `colorHex`) vardır.
  - Tüm atlar sol taraftaki `HorseList` panelinde tablo olarak gösterilir ve panel kendi içinde scroll olur.

- **6 turluk yarış programı**
  - Turlar ve mesafeler:
    - 1. tur: 1200m  
    - 2. tur: 1400m  
    - 3. tur: 1600m  
    - 4. tur: 1800m  
    - 5. tur: 2000m  
    - 6. tur: 2200m
  - Her tur için 20 attan **10 tanesi rastgele seçilir**.
  - Sağ taraftaki `Program` kolonunda her tur için başlangıç listeleri gösterilir.

- **Animasyonlu pist**
  - Orta panelde 10 kulvarlı pist, her kulvarda bir at.
  - Atlar `horse.svg` avatarı ve renkli rozet ile temsil edilir.
  - `trackHorses` içindeki `progress` alanı 0–100 arasında güncellenir ve yatay pozisyona çevrilir.
  - Aktif turun bilgisi (ör. `2ND Lap • 1400m`) pist başlığında gösterilir.

- **Gerçek zamanlı sonuçlar**
  - Her tikte atların ilerlemesi güncellenir, **ilk 100’e ulaşan atlar önce bitirmiş sayılır**.
  - Bitiş anındaki `tickCount` değeri `finishTick` olarak kaydedilir.
  - Sağ taraftaki `Results` kolonunda her tur tamamlandıkça sonuçlar tur tur doldurulur.

- **Kontroller**
  - **Generate Program**:
    - 20 atı ve 6 turluk programı sıfırdan üretir.
    - Önceki sonuçları, pist bilgisini ve animasyon döngüsünü temizler.
  - **Start / Pause / Resume**:
    - Yarışı başlatır, devam eder veya duraklatır.
    - Turlar sıra ile otomatik oynatılır; 6 tur bitince durum `completed` olur.

### Teknolojiler

- **Vue 3** (`<script setup>`)
- **Vuex 4** – merkezi durum yönetimi
- **Vite** – geliştirme ve build ortamı
- **Utility-first CSS** – hızlı layout ve stil için Tailwind benzeri utility sınıflar

### Mimari ve Önemli Noktalar

- **Vuex Store** (`src/store/index.js`)
  - **State**:
    - `horses`: 20 atlık ana havuz.
    - `schedule`: 6 tur + her turda 10 katılımcı listesi.
    - `trackHorses`: Aktif turda pistte koşan atlar (progress, finishTick vb.).
    - `results`: Her tur için sıralı sonuçlar.
    - `raceStatus`: `idle | ready | running | paused | completed`.
    - `tickCount`: Animasyon tiker sayacı; bitiş sıralamasını hesaplamak için kullanılır.
  - **Actions**:
    - `generateProgram`, `toggleRace`, `startRace`, `pauseRace`,
      `beginRound`, `runRoundLoop`, `endCurrentRound`.
    - `runRoundLoop`: Her 120 ms’de bir çalışarak atların `progress` değerlerini
      condition skoruna göre artırır ve tüm atlar bitirdiğinde sıradaki tura geçer.

- **Bileşenler**
  - `App.vue`: Genel layout – `TopBar`, `HorseList`, `RaceTrack`, `ProgramResults`.
  - `TopBar.vue`: Başlık ve kontrol butonları; Vuex aksiyonlarını tetikler.
  - `HorseList.vue`: 20 atın listesini ve condition/renk bilgilerini gösterir, kendi içinde scroll.
  - `RaceTrack.vue`: Pist, kulvar ve at animasyonları; aktif tur bilgisini gösterir.
  - `ProgramResults.vue`: Sol tarafta program, sağ tarafta sonuç tablolarını tur tur gösterir.
   - `HorseDetailModal.vue`: Bir ata tıklandığında açılan modal; sadece burada o atın katıldığı turlar, kazandığı yarışlar ve en iyi derecesi gibi detayları gösterir.

### Çalıştırma

- **Geliştirme ortamı**

```bash
npm install
npm run dev
```

- Tarayıcıdan `http://localhost:5173` adresine gidin.
- `Generate Program` → `Start` adımlarıyla yarışı başlatın.

### Ekran Görüntüsü

Ana ekran görünümü:

![Horse Racing Game Screenshot](https://github.com/mustafakaracuha/horse-racing-game/blob/main/src/assets/screenshots/app.png)