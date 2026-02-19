"use client";

/**
 * HeroSection organism
 * Full-bleed hero for the home page
 * - Background image with overlay gradient
 * - Headline + subheadline + CTA buttons
 * - Quick booking form strip (date + type selector)
 * - Animated entrance with staggered text reveals
 */

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Phone, ArrowRight, Star, ShieldCheck } from "lucide-react";
import Button from "@/components/atoms/Button";
import { generateQuickWhatsAppURL } from "@/lib/whatsapp";
import { SITE } from "@/lib/constants";

const easeOutCubic = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

const heroText: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
};

const heroItem: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutCubic } },
};

export default function HeroSection() {
    const waUrl = generateQuickWhatsAppURL(
        "Halo Jayabaya Rent! Saya ingin tanya info sewa mobil."
    );

    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-charcoal">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80')",
                }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/60 to-charcoal/20" />

            {/* Content */}
            <div className="relative z-10 container-main section-padding">
                <motion.div
                    variants={heroText}
                    initial="hidden"
                    animate="visible"
                    className="max-w-2xl"
                >
                    {/* Trust Badge */}
                    <motion.div variants={heroItem} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm text-white font-body">
                            Dipercaya 10.000+ pelanggan sejak 2015
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        variants={heroItem}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white leading-tight mb-4"
                    >
                        Sewa Mobil{" "}
                        <span className="text-primary">Terpercaya</span>
                        <br />
                        di Pare, Kediri
                    </motion.h1>

                    {/* Sub-headline */}
                    <motion.p
                        variants={heroItem}
                        className="text-lg text-white/80 font-body leading-relaxed mb-8 max-w-xl"
                    >
                        {SITE.description} Proses cepat, harga transparan, armada terawat.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div variants={heroItem} className="flex flex-wrap gap-4 mb-10">
                        <Link href="/catalog">
                            <Button
                                variant="primary"
                                size="lg"
                                pill
                                rightIcon={<ArrowRight className="w-5 h-5" />}
                            >
                                Lihat Katalog
                            </Button>
                        </Link>
                        <a href={waUrl} target="_blank" rel="noopener noreferrer">
                            <Button
                                variant="outline"
                                size="lg"
                                pill
                                leftIcon={<Phone className="w-5 h-5" />}
                                className="border-white text-white hover:bg-white hover:text-charcoal"
                            >
                                Hubungi Kami
                            </Button>
                        </a>
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        variants={heroItem}
                        className="flex flex-wrap items-center gap-6"
                    >
                        {[
                            { icon: ShieldCheck, label: "Unit Terawat" },
                            { icon: Phone, label: "Antar Jemput" },
                            { icon: Star, label: "Harga Terjangkau" },
                        ].map(({ icon: Icon, label }) => (
                            <div key={label} className="flex items-center gap-2 text-white/70">
                                <Icon className="w-4 h-4 text-primary" />
                                <span className="text-sm font-body">{label}</span>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-surface to-transparent" />
        </section>
    );
}
