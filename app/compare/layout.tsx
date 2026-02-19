import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Bandingkan Mobil",
    description:
        "Bandingkan spesifikasi, harga, dan fitur hingga 3 mobil secara berdampingan di Jayabaya Rent untuk menemukan armada yang paling sesuai kebutuhan Anda.",
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
