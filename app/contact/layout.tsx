import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Hubungi Kami",
    description:
        "Hubungi Jayabaya Rent melalui WhatsApp, Instagram, atau kunjungi kantor kami di Pare, Kediri. Siap melayani 24 jam.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
