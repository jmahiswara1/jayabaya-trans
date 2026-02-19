import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tentang Kami",
    description:
        "Jayabaya Rent berdiri sejak 2015, melayani 10.000+ pelanggan dengan armada terawat dan harga transparan di Pare, Kediri, Jawa Timur.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
