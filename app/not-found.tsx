import Link from "next/link";
import { Car, Home, Search } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import Button from "@/components/atoms/Button";

export default function NotFound() {
    return (
        <PageLayout>
            <div className="container-main py-24 md:py-36 flex flex-col items-center text-center">
                {/* Big 404 */}
                <div className="relative mb-6">
                    <span className="text-[120px] md:text-[160px] font-extrabold font-heading text-surface leading-none select-none">
                        404
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Car className="w-16 h-16 md:w-20 md:h-20 text-primary" />
                    </div>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold font-heading text-charcoal mb-3">
                    Halaman Tidak Ditemukan
                </h1>
                <p className="text-muted font-body max-w-md mb-10">
                    Halaman yang Anda cari tidak ada atau sudah dipindahkan. Yuk kembali ke beranda atau
                    telusuri katalog mobil kami.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                    <Link href="/">
                        <Button leftIcon={<Home className="w-4 h-4" />} pill>
                            Kembali ke Beranda
                        </Button>
                    </Link>
                    <Link href="/catalog">
                        <Button variant="outline" leftIcon={<Search className="w-4 h-4" />} pill>
                            Lihat Katalog Mobil
                        </Button>
                    </Link>
                </div>
            </div>
        </PageLayout>
    );
}
