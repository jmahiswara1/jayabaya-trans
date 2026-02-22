import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, MessageCircle } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import SectionTitle from "@/components/molecules/SectionTitle";
import CarGallery from "@/components/organisms/CarGallery";
import CarSpecs from "@/components/organisms/CarSpecs";
import BookingForm from "@/components/organisms/BookingForm";
import CarGrid from "@/components/organisms/CarGrid";
import TermsSection from "@/components/organisms/TermsSection";
import { getCarBySlug, getRelatedCars, cars } from "@/data/cars";
import { formatCurrency } from "@/lib/utils";
import { generateQuickWhatsAppURL } from "@/lib/whatsapp";

interface CarDetailProps {
    params: { slug: string };
}

// Generate static params for all cars
export async function generateStaticParams() {
    return cars.map((car) => ({
        slug: car.slug,
    }));
}

// Generate metadata
export async function generateMetadata({ params }: CarDetailProps): Promise<Metadata> {
    const car = getCarBySlug(params.slug);
    if (!car) return { title: "Mobil Tidak Ditemukan" };

    return {
        title: `Sewa ${car.name} ${car.year} - Jayabaya Trans`,
        description: `Sewa mobil ${car.name} ${car.year} di Pare, Kediri. ${car.description}`,
    };
}

export default function CarDetailPage({ params }: CarDetailProps) {
    const car = getCarBySlug(params.slug);

    if (!car) {
        notFound();
    }

    const relatedCars = getRelatedCars(car.id, car.type);
    const waUrl = generateQuickWhatsAppURL(`Halo Jayabaya Trans! Saya ingin tanya dulu mengenai sewa mobil ${car.name}.`);

    return (
        <PageLayout>
            {/* Breadcrumb Section */}
            <div className="bg-surface border-b border-gray-100 py-4">
                <div className="container-main flex items-center gap-2 text-sm text-muted font-body">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/katalog" className="hover:text-primary transition-colors">Katalog</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-charcoal font-medium truncate">{car.name}</span>
                </div>
            </div>

            <div className="container-main py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Left Column: Gallery & Specs */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Header (Mobile Only) */}
                        <div className="lg:hidden">
                            <div className="flex flex-wrap gap-2 mb-3">
                                <Badge variant="type">{car.type}</Badge>
                                <Badge variant="transmission">{car.transmission}</Badge>
                                {(car.withDriver || car.type === "Minibus") && (
                                    <Badge variant="driver">Wajib Supir</Badge>
                                )}
                            </div>
                            <h1 className="text-2xl font-bold font-heading text-charcoal mb-2">{car.name}</h1>
                            <p className="text-primary font-bold text-xl">
                                {formatCurrency(car.pricePerDay)} <span className="text-sm text-muted font-normal">/ 24 jam</span>
                            </p>
                        </div>

                        <CarGallery images={car.images} name={car.name} />

                        <div className="space-y-6">
                            <h2 className="text-xl font-bold font-heading text-charcoal">Deskripsi</h2>
                            <p className="text-muted font-body leading-relaxed">
                                {car.description}
                            </p>
                        </div>

                        <div className="border-t border-gray-100 pt-8">
                            <CarSpecs car={car} />
                        </div>

                        <div className="border-t border-gray-100 pt-8">
                            <TermsSection />
                        </div>
                    </div>

                    {/* Right Column: Booking Form (Sticky) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            {/* Desktop Header */}
                            <div className="hidden lg:block bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <Badge variant="type">{car.type}</Badge>
                                    <Badge variant="transmission">{car.transmission}</Badge>
                                    <Badge variant="fuel">{car.fuel}</Badge>
                                    {(car.withDriver || car.type === "Minibus") && (
                                        <Badge variant="driver">Wajib Supir</Badge>
                                    )}
                                </div>
                                <h1 className="text-3xl font-bold font-heading text-charcoal mb-2">{car.name}</h1>
                                <div className="flex items-end gap-2 mb-6">
                                    <span className="text-3xl font-bold text-primary">{formatCurrency(car.pricePerDay)}</span>
                                    <span className="text-muted font-body mb-1">/ 24 jam</span>
                                </div>
                                <div className="flex gap-3">
                                    <a href={waUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                                        <Button variant="outline" fullWidth leftIcon={<MessageCircle className="w-4 h-4" />}>
                                            Tanya Dulu
                                        </Button>
                                    </a>
                                </div>
                            </div>

                            {/* Booking Form */}
                            <BookingForm carName={car.name} />
                        </div>
                    </div>
                </div>

                {/* Related Cars */}
                {relatedCars.length > 0 && (
                    <div className="mt-20 border-t border-gray-100 pt-12">
                        <SectionTitle
                            title="Mobil Serupa"
                            subtitle="Pilihan lain yang mungkin cocok dengan kebutuhan Anda."
                        />
                        <div className="mt-8">
                            <CarGrid cars={relatedCars} />
                        </div>
                    </div>
                )}
            </div>
        </PageLayout>
    );
}
