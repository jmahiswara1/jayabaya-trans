/**
 * Footer organism
 * Three-column footer: brand + description, navigasi, informasi
 * Contact info, social links, and copyright
 */

import Link from "next/link";
import { Phone, Instagram, MapPin, Clock } from "lucide-react";
import { FOOTER_NAV, CONTACT, SITE } from "@/lib/constants";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-charcoal text-white">
            <div className="container-main py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-flex items-center gap-2 mb-4">
                            <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm font-heading">JR</span>
                            </span>
                            <span className="text-xl font-bold font-heading">
                                Jayabaya<span className="text-primary">Rent</span>
                            </span>
                        </Link>
                        <p className="text-white/60 font-body text-sm leading-relaxed max-w-xs mb-6">
                            {SITE.description}
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <a
                                href={CONTACT.whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-sm font-body text-white/60 hover:text-white transition-colors group"
                            >
                                <Phone className="w-4 h-4 text-primary group-hover:scale-110 transition-transform shrink-0" />
                                {CONTACT.whatsappFormatted}
                            </a>
                            <a
                                href={CONTACT.instagramLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-sm font-body text-white/60 hover:text-white transition-colors group"
                            >
                                <Instagram className="w-4 h-4 text-primary group-hover:scale-110 transition-transform shrink-0" />
                                {CONTACT.instagram}
                            </a>
                            <div className="flex items-start gap-3 text-sm font-body text-white/60">
                                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                <span>{CONTACT.address}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-body text-white/60">
                                <Clock className="w-4 h-4 text-primary shrink-0" />
                                {CONTACT.operationalHours}
                            </div>
                        </div>
                    </div>

                    {/* Navigasi Column */}
                    <div>
                        <h3 className="text-sm font-semibold font-heading uppercase tracking-wider text-white/40 mb-4">
                            Navigasi
                        </h3>
                        <ul className="space-y-2.5">
                            {FOOTER_NAV.navigasi.map(({ label, href }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className="text-sm font-body text-white/60 hover:text-white transition-colors"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Informasi Column */}
                    <div>
                        <h3 className="text-sm font-semibold font-heading uppercase tracking-wider text-white/40 mb-4">
                            Informasi
                        </h3>
                        <ul className="space-y-2.5">
                            {FOOTER_NAV.informasi.map(({ label, href }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className="text-sm font-body text-white/60 hover:text-white transition-colors"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="container-main py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-white/40 font-body">
                        &copy; {currentYear} {SITE.name}. Semua hak dilindungi.
                    </p>
                    <p className="text-xs text-white/40 font-body">
                        Sewa mobil terpercaya di Pare, Kediri
                    </p>
                </div>
            </div>
        </footer>
    );
}
