/**
 * PageLayout organism
 * Wraps every page with Navbar + main content + Footer
 * Adds proper top padding to account for fixed Navbar height
 */

import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import { cn } from "@/lib/utils";

interface PageLayoutProps {
    children: React.ReactNode;
    /** When true, hero section manages its own top padding (full-bleed hero) */
    fullBleed?: boolean;
    className?: string;
}

export default function PageLayout({
    children,
    fullBleed = false,
    className,
}: PageLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main
                className={cn(
                    "flex-1",
                    !fullBleed && "pt-16 md:pt-20",
                    className
                )}
            >
                {children}
            </main>
            <Footer />
        </div>
    );
}
