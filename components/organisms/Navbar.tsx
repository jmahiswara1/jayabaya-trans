"use client";

/**
 * Navbar organism
 * Sticky top navbar with:
 * - Logo + nav links
 * - CTA "Sewa Sekarang" button
 * - Mobile sidebar with smooth animation
 * - Compare indicator badge
 * - Scroll-aware background transition
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, GitCompareArrows, Phone } from "lucide-react";
import Button from "@/components/atoms/Button";
import { NAV_LINKS, CONTACT } from "@/lib/constants";
import { useCompareStore } from "@/lib/compareStore";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const compareCount = useCompareStore((s) => s.cars.length);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    isScrolled
                        ? "bg-white/95 backdrop-blur-md shadow-sm"
                        : "bg-transparent"
                )}
            >
                <nav className="container-main flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm font-heading">JR</span>
                        </span>
                        <span
                            className={cn(
                                "text-xl font-bold font-heading transition-colors",
                                isScrolled ? "text-charcoal" : "text-charcoal"
                            )}
                        >
                            Jayabaya<span className="text-primary">Rent</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <ul className="hidden md:flex items-center gap-1">
                        {NAV_LINKS.map(({ label, href }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className={cn(
                                        "px-4 py-2 text-sm font-medium font-body rounded-lg transition-colors",
                                        pathname === href
                                            ? "text-primary bg-primary/5"
                                            : "text-charcoal hover:text-primary hover:bg-surface"
                                    )}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* Compare Badge */}
                        {compareCount > 0 && (
                            <Link href="/compare" className="relative">
                                <button className="p-2 text-charcoal hover:text-primary transition-colors">
                                    <GitCompareArrows className="w-5 h-5" />
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                                        {compareCount}
                                    </span>
                                </button>
                            </Link>
                        )}
                        <a href={CONTACT.whatsappLink} target="_blank" rel="noopener noreferrer">
                            <Button variant="primary" size="sm" pill leftIcon={<Phone className="w-4 h-4" />}>
                                Sewa Sekarang
                            </Button>
                        </a>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-charcoal hover:text-primary transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </nav>
            </header>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/40 z-40 md:hidden"
                            onClick={() => setIsMenuOpen(false)}
                        />
                        <motion.aside
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="fixed top-0 right-0 bottom-0 w-72 bg-white z-50 shadow-floating flex flex-col md:hidden"
                        >
                            {/* Sidebar Header */}
                            <div className="flex items-center justify-between p-5 border-b border-gray-100">
                                <span className="text-lg font-bold font-heading text-charcoal">
                                    Jayabaya<span className="text-primary">Rent</span>
                                </span>
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="p-1 text-muted hover:text-charcoal"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Sidebar Links */}
                            <nav className="flex-1 py-4">
                                {NAV_LINKS.map(({ label, href }) => (
                                    <Link
                                        key={href}
                                        href={href}
                                        className={cn(
                                            "flex items-center px-5 py-3 text-base font-medium font-body transition-colors",
                                            pathname === href
                                                ? "text-primary bg-primary/5 border-l-2 border-primary"
                                                : "text-charcoal hover:text-primary hover:bg-surface"
                                        )}
                                    >
                                        {label}
                                    </Link>
                                ))}
                                {compareCount > 0 && (
                                    <Link
                                        href="/compare"
                                        className="flex items-center gap-2 px-5 py-3 text-base font-medium font-body text-charcoal hover:text-primary hover:bg-surface"
                                    >
                                        <GitCompareArrows className="w-5 h-5" />
                                        Bandingkan ({compareCount})
                                    </Link>
                                )}
                            </nav>

                            {/* Sidebar CTA */}
                            <div className="p-5 border-t border-gray-100">
                                <a
                                    href={CONTACT.whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                >
                                    <Button variant="primary" fullWidth pill leftIcon={<Phone className="w-4 h-4" />}>
                                        Sewa Sekarang
                                    </Button>
                                </a>
                                <p className="text-xs text-muted text-center mt-3 font-body">
                                    {CONTACT.operationalHours}
                                </p>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
