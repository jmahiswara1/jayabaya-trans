import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Promo Sewa Mobil",
    description:
        "Nikmati paket promo sewa mobil terbaik dari Jayabaya Rent. Paket wisata, Kampung Inggris, wedding, dan lainnya dengan harga spesial.",
};

export default function PromoLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
