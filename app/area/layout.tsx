import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Area Layanan",
    description:
        "Jayabaya Rent melayani sewa mobil di Kediri, Blitar, Tulungagung, Malang, Surabaya, dan kota-kota lain di Jawa Timur. Cek biaya antar luar kota.",
};

export default function AreaLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
