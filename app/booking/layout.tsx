import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pesan Mobil",
    description:
        "Pesan mobil sewa di Jayabaya Rent dengan mudah. Isi form, kirim via WhatsApp, dan tim kami akan konfirmasi dalam hitungan menit.",
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
