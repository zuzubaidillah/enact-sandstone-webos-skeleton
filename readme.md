# Enact + Sandstone webOS Skeleton

Starter **React + Enact (Sandstone)** untuk **webOS TV** dengan:
- 5‑way focus (**Spotlight**)
- **Video Player** + binding **media keys**
- **i18n** (persist locale EN/ID dengan `localStorage`)
- Contoh **LS2 (Luna Service)** `getSystemInfo`
- **Realtime** (SSE/EventSource & WebSocket)
- Styling tambahan via **LESS (CSS Modules)**

---

## 1) Prasyarat
- **Node.js ≥ 18** dan npm terbaru
- **Enact CLI** (opsional global): `npm i -g @enact/cli`
- **webOS TV CLI** (untuk .ipk & deploy): `ares-setup-device`, `ares-package`, `ares-install`, `ares-launch`, `ares-inspect`
- TV dengan **Developer Mode** aktif (untuk instalasi)

> Cek versi cepat:
```bash
node -v
npm -v
enact -v       # jika terpasang global
```

---

## 2) Struktur Proyek
```
enact-sandstone-webos-skeleton/
├─ package.json
├─ src/
│  ├─ index.js
│  ├─ App/App.js
│  ├─ views/
│  │  ├─ MainPanel.js
│  │  ├─ SettingsPanel.js
│  │  ├─ VideoPanel.js
│  │  ├─ VideoPanel.module.less
│  ├─ components/
│  │  ├─ FocusGrid.js
│  │  ├─ SystemInfoCard.js
│  │  └─ RealtimeStatus.js
│  └─ services/
│     ├─ system.js
│     ├─ locale.js
│     └─ realtime.js
├─ resources/
│  └─ strings.json
└─ webos-meta/
   ├─ appinfo.json
   └─ icon.png (opsional)
```

---

## 3) Instalasi
```bash
npm install
```
Jika muncul peringatan **Browserslist caniuse-lite is outdated**:
```bash
npx update-browserslist-db@latest
```

---

## 4) Menjalankan di mode development
```bash
npm run serve
```
- Buka URL yang ditampilkan CLI (mis. `http://localhost:8080`).
- Navigasi dengan tombol panah/OK/Back di remote/keyboard.
- **Video**: Panel *Video* mendukung Play/Pause, ±10s, dan tombol media remote (Play/Pause/Stop/Rewind/FF).
- **Settings**: Ganti bahasa (EN/ID). Locale tersimpan ke `localStorage` & langsung mengubah UI.
- **Realtime**: Edit endpoint di `src/components/RealtimeStatus.js` → `SSE_URL` & `WS_URL`.

---

## 5) Lint & Test
```bash
npm run lint
npm run test
```
Aturan umum yang dipakai:
- **`react/jsx-no-bind`**: hindari arrow function di props; gunakan handler `useCallback`.
- **`no-undef`** untuk API browser: gunakan guard (`typeof window !== 'undefined'`) atau `/* eslint-env browser */`.

---

## 6) Build produksi (bundle)
```bash
npm run pack   # menjalankan 'enact pack'
```
Hasilnya ada di `dist/` (mis. `dist/main.js`, `dist/main.css`).

> **Penting**: pastikan file **webOS meta** ikut masuk ke `dist/`.
```bash
# salin metadata webOS ke dist bila belum ada
cp -R webos-meta/* dist/
# pastikan ada appinfo.json
ls dist/appinfo.json
```

`appinfo.json` minimal:
```json
{
  "id": "com.example.enact.skeleton",
  "version": "1.0.0",
  "vendor": "Example",
  "type": "web",
  "main": "index.html",
  "title": "Enact Sandstone Skeleton",
  "icon": "icon.png",
  "bgColor": "#000000",
  "iconColor": "#FFFFFF"
}
```
Tingkatkan `version` setiap kali melakukan instalasi ulang ke TV.

---

## 7) Packaging menjadi **.ipk**
1) Pastikan `dist/` berisi **bundle** + **appinfo.json** (+ ikon, dsb).  
2) Jalankan paket:
```bash
# dari root proyek
ares-package dist -o ./ipk
```
Hasil: `./ipk/<appId>_<version>_all.ipk`

---

## 8) Menyiapkan device (sekali saja)
1) Aktifkan **Developer Mode** di TV (via aplikasi *Developer Mode*).  
2) Tambahkan device di CLI:
```bash
ares-setup-device --add    # isi nama device, IP TV, user/pass dev mode
ares-setup-device --list   # pastikan device terdaftar / default
```

---

## 9) Install & jalankan di TV
```bash
# install .ipk ke TV
ares-install -d <deviceName> ./ipk/<appId>_<version>_all.ipk

# jalankan app
ares-launch  -d <deviceName> <appId>

# (opsional) buka Web Inspector untuk debugging
ares-inspect -d <deviceName> <appId>
```
Ganti `<deviceName>` sesuai yang Anda set di `ares-setup-device`, dan `<appId>` sesuai `id` di `appinfo.json`.

---

## 10) Konfigurasi i18n (EN/ID)
- String ada di `resources/strings.json`.
- Penggunaan di kode: `$L('Key')`.
- Persist locale: `saveLocale()` / `getSavedLocale()` di `src/services/locale.js`.
- Penggantian bahasa live dari **Settings**: memanggil `updateLocale`, menyimpan ke `localStorage`, dan mengalirkan perubahan ke `ThemeDecorator`.

---

## 11) Realtime (SSE & WebSocket)
- Ganti `SSE_URL` & `WS_URL` di `src/components/RealtimeStatus.js`.
- SSE cocok untuk broadcast satu arah (notifikasi/progress), WebSocket untuk dua arah (chat/kontrol).
- Pastikan proxy/server tidak mem‑buffer SSE (`text/event-stream`) dan kirim heartbeat berkala.

---

## 12) Video Player & Media Keys
- Komponen: `@enact/sandstone/VideoPlayer` + `MediaControls` (butuh `id` stabil).
- Handle tombol media via `window.addEventListener('keydown', ...)` (Play/Pause/Stop/FF/REW/Seek±).
- Tombol kontrol tambahan ada di panel **Video**.

---

## 13) Styling (LESS + CSS Modules)
- File: `src/views/VideoPanel.module.less`.
- Import di komponen: `import css from './VideoPanel.module.less'` lalu `className={css.player}`.
- Enact CLI sudah mendukung LESS & CSS Modules.

---

## 14) Troubleshooting
- **ETARGET versi npm Enact/Sandstone**: pastikan versi “sepasang” (mis. Sandstone `2.9.x` ↔ Enact `4.9.x`).
- **`react/jsx-no-bind`**: pindahkan arrow di props ke handler `useCallback`.
- **`no-undef` API browser** (`localStorage`, `EventSource`, `WebSocket`): gunakan guard `typeof window !== 'undefined'` atau `/* eslint-env browser */`.
- **`appinfo.json not found`** saat `ares-package`: salin `webos-meta/*` ke `dist/` sebelum packaging.
- **Tidak muncul update di TV**: naikkan `version` di `appinfo.json`, lalu install ulang.
- **Dev Mode habis masa aktif**: aktifkan ulang aplikasi *Developer Mode* di TV.

---

## 15) Skrip ringkas
Tambahkan skrip berikut ke `package.json` untuk alur lengkap:
```json
{
  "scripts": {
    "serve": "enact serve",
    "pack": "enact pack",
    "ipk": "cp -R webos-meta/* dist/ && ares-package dist -o ./ipk",
    "deploy": "npm run ipk && ares-install -d tv ./ipk/$(jq -r .id webos-meta/appinfo.json)_$(jq -r .version webos-meta/appinfo.json)_all.ipk && ares-launch -d tv $(jq -r .id webos-meta/appinfo.json)"
  }
}
```
> Ganti `-d tv` dengan nama device Anda. Jika tidak memakai `jq`, buat skrip shell sederhana atau isi nilai `appId`/`version` secara manual.

---

## 16) Lisensi
MIT (atau sesuaikan kebutuhan proyek Anda).

