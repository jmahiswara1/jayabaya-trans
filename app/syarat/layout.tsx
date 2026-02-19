import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Syarat & Ketentuan",
    description:
        "Pelajari syarat dan ketentuan sewa mobil di Jayabaya Rent: dokumen yang diperlukan, aturan penggunaan, kebijakan pembatalan, dan biaya denda.",
};

export default function SyaratLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
