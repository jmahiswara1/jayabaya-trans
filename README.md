# Jayabaya Trans — Modern Car Rental Platform

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-black?style=for-the-badge&logo=vercel)

**Jayabaya Trans** adalah proyek pengembangan aplikasi web penyewaan mobil yang berfokus pada kecepatan, SEO, dan pengalaman pengguna yang intuitif. Terinspirasi oleh kebutuhan transportasi di wilayah Pare (Kampung Inggris) dan Kediri, proyek ini mensimulasikan platform *real-world* dengan integrasi pemesanan WhatsApp.

> **Portfolio Note:** Proyek ini adalah sebuah **Studi Kasus & Proyek Portofolio** untuk mendemonstrasikan kemampuan pengembangan *frontend* modern. Ini bukan layanan bisnis operasional yang asli.

---

## Preview

[Jayabaya Trans](https://jayabayatrans.vercel.app)

---

## Keunggulan Teknis

Dalam membangun proyek ini, saya berfokus pada tiga pilar utama pengembangan web:

**Performa Maksimal**
Menggunakan Next.js 14 App Router dengan Static Site Generation (SSG) untuk memastikan waktu muat yang instan.

**Scalable Architecture**
Menerapkan pola Atomic Design untuk memisahkan komponen menjadi unit terkecil (Atoms) hingga organisme kompleks, memudahkan *maintenance* dan *reusability*.

**SEO & Accessibility**
Optimasi metadata dinamis untuk setiap halaman dan struktur HTML semantik untuk aksesibilitas yang lebih baik.

---

## Tech Stack

| Layer | Teknologi |
| :--- | :--- |
| Frontend Framework | Next.js 14 (App Router) |
| Programming Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Animation | Framer Motion |
| Icons | Lucide React |
| State Management | Zustand |
| Form Handling | React Hook Form |
| Deployment | Vercel |

---

## Fitur Utama

### Katalog Kendaraan Dinamis

Sistem filter canggih berdasarkan tipe (MPV, City Car, SUV), jenis transmisi, dan kapasitas penumpang yang terintegrasi dengan URL parameters.

### Fitur Perbandingan (Compare Tool)

Pengguna dapat memilih hingga 3 unit kendaraan untuk dibandingkan spesifikasinya secara *side-by-side*. Fitur ini dikelola menggunakan Zustand untuk manajemen *state* global yang ringan.

### Smart Booking via WhatsApp

Form pemesanan yang divalidasi dengan React Hook Form, yang kemudian secara otomatis menghasilkan pesan terformat rapi untuk dikirimkan ke WhatsApp Admin tanpa memerlukan database backend.

### Detail Kendaraan Berbasis SEO

Setiap unit memiliki halaman detailnya sendiri (`/katalog/[slug]`) dengan metadata yang dioptimasi untuk mesin pencari.

---

## Struktur Folder

```text
app/
├── (pages)/          # Seluruh route utama (Home, Catalog, Booking, dsb)
└── layout.tsx        # Root layout & Provider

components/
├── atoms/            # Button, Input, Badge, Logo
├── molecules/        # Card Item, Filter Group, FAQ Item
├── organisms/        # Navbar, Footer, Comparison Table, Hero Section
└── layout/           # Section wrappers

data/
├── cars.ts           # Data statis armada kendaraan
├── promos.ts         # Data paket promo
└── faq.ts            # Konten FAQ

lib/
├── store/            # Zustand store logic
├── utils/            # Helper functions (WhatsApp formatter, currency)
└── constants.ts      # Config & constant values
```

---

## Instalasi Lokal

Clone repositori:

```bash
git clone https://github.com/gadangmahiswara/jayabaya-trans.git
```

Masuk ke direktori:

```bash
cd jayabaya-trans
```

Install dependensi:

```bash
npm install
```

Jalankan server pengembangan:

```bash
npm run dev
```

Akses melalui `http://localhost:3000`.

---

## Pengembangan Selanjutnya

- [ ] Integrasi CMS (Sanity/Contentful) untuk manajemen data mobil secara dinamis.
- [ ] Implementasi PWA (Progressive Web App) agar dapat diinstal di perangkat mobile.
- [ ] Penambahan fitur ulasan pelanggan yang terhubung ke Google Maps API.

---

## Profil Pengembang

**Gadang Jatu Mahiswara**
Informatics Engineering Student — Universitas Negeri Surabaya

Saya adalah seorang pengembang web yang antusias dengan ekosistem React dan desain UI/UX. Saat ini sedang aktif mencari peluang magang atau posisi Junior Full-stack/Frontend Developer.

- **LinkedIn:** [linkedin.com/in/gadangmahiswara](https://linkedin.com/in/gadangmahiswara)
- **Portfolio:** [jmahiswara.my.id](https://jmahiswara.my.id)
- **Email:** gadangjatumahiswara@gmail.com

---

© 2026 Gadang Jatu Mahiswara. Built with passion for web development.
