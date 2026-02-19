import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Jayabaya Rent - Sewa Mobil Terpercaya di Pare, Kediri",
    template: "%s | Jayabaya Rent",
  },
  description:
    "Jasa sewa mobil terpercaya di Pare, Kediri dan sekitarnya. Armada terawat, harga transparan, siap antar-jemput 24 jam. Booking mudah via WhatsApp.",
  keywords: [
    "sewa mobil",
    "rental mobil",
    "Pare",
    "Kediri",
    "Jayabaya Rent",
    "sewa mobil Kediri",
    "rental mobil Pare",
    "Kampung Inggris",
  ],
  authors: [{ name: "Jayabaya Rent" }],
  openGraph: {
    title: "Jayabaya Rent - Sewa Mobil Terpercaya di Pare, Kediri",
    description:
      "Jasa sewa mobil terpercaya di Pare, Kediri dan sekitarnya. Armada terawat, harga transparan.",
    url: "https://jayabayarent.com",
    siteName: "Jayabaya Rent",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${plusJakarta.variable} ${inter.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
