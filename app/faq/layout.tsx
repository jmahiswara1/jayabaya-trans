import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "FAQ — Pertanyaan Umum",
    description:
        "Temukan jawaban atas pertanyaan umum seputar sewa mobil di Jayabaya Rent Pare, Kediri — syarat, harga, layanan antar-jemput, dan lainnya.",
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
