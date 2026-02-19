# Jayabaya Rent

Website sewa mobil modern untuk **Jayabaya Rent**, penyedia jasa rental kendaraan yang berlokasi di Pare, Kabupaten Kediri, Jawa Timur. Dibangun sebagai aplikasi frontend-only berbasis Next.js dengan fokus pada performa, SEO, dan kemudahan pemesanan melalui WhatsApp.

---

## Deskripsi

Jayabaya Rent hadir untuk mempermudah masyarakat, wisatawan, pelajar Kampung Inggris, dan pelaku bisnis lokal dalam menemukan dan memesan kendaraan sewa yang sesuai kebutuhan. Proses pemesanan dilakukan sepenuhnya melalui WhatsApp tanpa memerlukan akun atau login.

---

## Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | Next.js 14 (App Router, SSG) |
| Bahasa | TypeScript |
| Styling | Tailwind CSS v3 |
| Animasi | Framer Motion |
| Ikon | Lucide React |
| Gambar | Next/Image + Unsplash |
| Form | React Hook Form |
| State Global | Zustand (fitur bandingkan mobil) |
| Font | Plus Jakarta Sans + Inter (Google Fonts) |
| Deploy | Vercel |

---

## Fitur

### Halaman

- **Beranda** — Hero section, keunggulan layanan, cara sewa, testimoni, dan CTA
- **Katalog** — Daftar 20 kendaraan dengan filter tipe/transmisi/kapasitas, pencarian, dan pengurutan
- **Detail Mobil** — Galeri foto, spesifikasi lengkap, form pemesanan terintegrasi WA
- **Bandingkan** — Pilih hingga 3 mobil, bandingkan spesifikasi secara berdampingan
- **Pemesanan** — Form pemesanan lengkap, dikirim otomatis ke WhatsApp
- **Tentang Kami** — Sejarah, statistik, dan keunggulan layanan
- **FAQ** — Pertanyaan umum dengan navigasi per kategori
- **Kontak** — Informasi kontak, embed Google Maps, dan form pesan cepat
- **Promo** — Paket sewa spesial dengan harga dan detail layanan
- **Area Layanan** — Kota yang dilayani, biaya antar luar kota, destinasi populer
- **Syarat dan Ketentuan** — Dokumen yang diperlukan, aturan, pembayaran, dan denda

### Teknis

- Seluruh halaman di-render secara statis (SSG) untuk performa optimal
- SEO metadata per halaman (title, description, Open Graph)
- Desain responsif untuk mobile, tablet, dan desktop
- Animasi halus menggunakan Framer Motion
- Integrasi WhatsApp dengan pesan terformat otomatis
- URL parameter untuk filter katalog yang dapat dibagikan
- Komponen mengikuti pola Atomic Design

---

## Struktur Proyek

```
app/
  (route pages)/
components/
  atoms/
  molecules/
  organisms/
  layout/
data/
  cars.ts
  faq.ts
  promos.ts
lib/
  animations.ts
  compareStore.ts
  constants.ts
  utils.ts
  whatsapp.ts
public/
  images/
```

---

## Menjalankan Secara Lokal

```bash
# Install dependensi
npm install

# Jalankan development server
npm run dev

# Build production
npm run build
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## Pengembangan Selanjutnya

- Integrasi backend untuk manajemen armada dan pemesanan
- Panel admin untuk memperbarui data kendaraan, promo, dan area
- Notifikasi otomatis via WhatsApp Business API
- Halaman ulasan pelanggan dengan integrasi Google Reviews
- Pelacakan ketersediaan unit secara real-time
- Progressive Web App (PWA) untuk pengalaman mobile yang lebih baik

---

## Lisensi

Proyek ini dikembangkan untuk keperluan internal Jayabaya Rent. Seluruh hak cipta dilindungi.
