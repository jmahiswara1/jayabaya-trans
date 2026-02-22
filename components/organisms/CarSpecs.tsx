import { Check, X, Fuel, Cog, Users, Thermometer, Radio, Map, BatteryCharging, Briefcase, UserCheck } from "lucide-react";
import { Car } from "@/data/cars";

interface CarSpecsProps {
    car: Car;
}

export default function CarSpecs({ car }: CarSpecsProps) {
    const specs = [
        { label: "Tahun", value: car.year, icon: null },
        { label: "Mesin", value: car.specs.engine, icon: Cog },
        { label: "Kapasitas", value: `${car.capacity} Orang`, icon: Users },
        { label: "Bagasi", value: car.specs.luggage, icon: Briefcase },
        { label: "Bahan Bakar", value: car.fuel, icon: Fuel },
        { label: "Transmisi", value: car.transmission, icon: Cog },
    ];

    const features = [
        { label: "AC Double Blower", value: car.specs.ac, icon: Thermometer },
        { label: "Musik / Audio", value: car.specs.music, icon: Radio },
        { label: "GPS Navigation", value: car.specs.gps, icon: Map },
        { label: "USB Charger", value: car.specs.usbCharger, icon: BatteryCharging },
        ...(car.withDriver || car.type === "Minibus" ? [{ label: "Wajib Supir", value: true, icon: UserCheck }] : []),
    ];

    return (
        <div className="space-y-8">
            {/* Main Specs */}
            <div>
                <h3 className="text-lg font-bold font-heading text-charcoal mb-4">Spesifikasi Utama</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {specs.map((item) => (
                        <div key={item.label} className="p-4 bg-surface rounded-xl border border-gray-100">
                            <p className="text-xs text-muted font-body mb-1">{item.label}</p>
                            <p className="text-sm font-bold text-charcoal font-heading">{item.value}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Features */}
            <div>
                <h3 className="text-lg font-bold font-heading text-charcoal mb-4">Fasilitas & Fitur</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {features.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div key={item.label} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-full ${item.value ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                                        <Icon className="w-4 h-4" />
                                    </div>
                                    <span className={`text-sm font-medium ${item.value ? "text-charcoal" : "text-muted"}`}>
                                        {item.label}
                                    </span>
                                </div>
                                {item.value ? (
                                    <Check className="w-5 h-5 text-green-500" />
                                ) : (
                                    <X className="w-5 h-5 text-gray-300" />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
