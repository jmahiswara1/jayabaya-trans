"use client";

/**
 * CompareTable organism
 * Full comparison table for up to 3 cars
 * Renders spec rows with highlighted differences
 * Used on /compare page
 */

import Image from "next/image";
import Link from "next/link";
import { Check, X, ExternalLink } from "lucide-react";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import { formatCurrency } from "@/lib/utils";
import { generateCarInquiryURL } from "@/lib/whatsapp";
import { useCompareStore } from "@/lib/compareStore";
import type { Car } from "@/data/cars";

interface SpecRow {
    label: string;
    getValue: (car: Car) => React.ReactNode;
}

const specRows: SpecRow[] = [
    { label: "Tipe", getValue: (c) => <Badge variant="type">{c.type}</Badge> },
    { label: "Tahun", getValue: (c) => c.year },
    { label: "Transmisi", getValue: (c) => <Badge variant="transmission">{c.transmission}</Badge> },
    { label: "Bahan Bakar", getValue: (c) => <Badge variant="fuel">{c.fuel}</Badge> },
    { label: "Kapasitas", getValue: (c) => `${c.capacity} orang` },
    { label: "Harga/Hari", getValue: (c) => <span className="font-bold text-primary">{formatCurrency(c.pricePerDay)}</span> },
    { label: "Mesin", getValue: (c) => c.specs.engine },
    { label: "AC", getValue: (c) => c.specs.ac ? <Check className="w-4 h-4 text-green-600" /> : <X className="w-4 h-4 text-red-400" /> },
    { label: "Koper", getValue: (c) => c.specs.luggage },
    { label: "Musik", getValue: (c) => c.specs.music ? <Check className="w-4 h-4 text-green-600" /> : <X className="w-4 h-4 text-red-400" /> },
    { label: "GPS", getValue: (c) => c.specs.gps ? <Check className="w-4 h-4 text-green-600" /> : <X className="w-4 h-4 text-red-400" /> },
    { label: "USB Charger", getValue: (c) => c.specs.usbCharger ? <Check className="w-4 h-4 text-green-600" /> : <X className="w-4 h-4 text-red-400" /> },
    { label: "Supir", getValue: (c) => (c.withDriver || c.type === "Minibus") ? <span className="text-xs font-bold text-green-600">Wajib / Termasuk</span> : <span className="text-xs text-muted">Lepas Kunci</span> },
];

export default function CompareTable() {
    const { cars, removeCar } = useCompareStore();

    if (cars.length === 0) return null;

    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse">
                <thead>
                    <tr>
                        {/* Row label column */}
                        <th className="w-40 text-left p-4 bg-surface rounded-tl-2xl text-sm font-semibold text-muted font-body">
                            Spesifikasi
                        </th>
                        {cars.map((car) => (
                            <th key={car.id} className="p-4 bg-white text-center border-l border-gray-100">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="relative w-32 h-20 rounded-xl overflow-hidden">
                                        <Image
                                            src={car.images[0]}
                                            alt={car.name}
                                            fill
                                            className="object-cover"
                                            sizes="128px"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold font-heading text-charcoal">
                                            {car.name}
                                        </h3>
                                        <p className="text-xs text-muted font-body">{car.year}</p>
                                    </div>
                                    <button
                                        onClick={() => removeCar(car.id)}
                                        className="text-xs text-muted hover:text-red-500 transition-colors font-body"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {specRows.map((row, idx) => (
                        <tr key={row.label} className={idx % 2 === 0 ? "bg-surface/50" : "bg-white"}>
                            <td className="p-4 text-sm font-medium font-body text-charcoal border-r border-gray-100">
                                {row.label}
                            </td>
                            {cars.map((car) => (
                                <td key={car.id} className="p-4 text-sm text-center text-charcoal font-body border-l border-gray-100">
                                    <div className="flex items-center justify-center">
                                        {row.getValue(car)}
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}

                    {/* CTA Row */}
                    <tr className="bg-white border-t-2 border-gray-100">
                        <td className="p-4 rounded-bl-2xl" />
                        {cars.map((car) => (
                            <td key={car.id} className="p-4 border-l border-gray-100">
                                <div className="flex flex-col gap-2 items-center">
                                    <a
                                        href={generateCarInquiryURL(car.name)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full"
                                    >
                                        <Button variant="primary" size="sm" fullWidth>
                                            Sewa Ini
                                        </Button>
                                    </a>
                                    <Link href={`/katalog/${car.slug}`} className="w-full">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            fullWidth
                                            rightIcon={<ExternalLink className="w-3 h-3" />}
                                        >
                                            Detail
                                        </Button>
                                    </Link>
                                </div>
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
