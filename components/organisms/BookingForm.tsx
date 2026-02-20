"use client";

/**
 * BookingForm organism
 * WhatsApp-integrated booking form
 * Fields: name, phone, car (prefilled from URL), pickup date, return date, pickup location, notes
 * On submit: generates formatted WA message and opens wa.me link
 */

import { useForm } from "react-hook-form";
import { MapPin, User, Phone as PhoneIcon, Send } from "lucide-react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Button from "@/components/atoms/Button";
import DateRangePicker from "@/components/atoms/DateRangePicker";
import { generateWhatsAppURL } from "@/lib/whatsapp";
import { calculateDuration } from "@/lib/utils";

interface BookingFormData {
    name: string;
    phone: string;
    pickupDate: string;
    returnDate: string;
    pickupLocation: string;
    notes?: string;
}

interface BookingFormProps {
    carName?: string;
}

export default function BookingForm({ carName }: BookingFormProps) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<BookingFormData>();

    const pickupDate = watch("pickupDate");
    const returnDate = watch("returnDate");

    const durationDays =
        pickupDate && returnDate
            ? calculateDuration(new Date(pickupDate), new Date(returnDate))
            : null;

    const onSubmit = (data: BookingFormData) => {
        const durasi = durationDays ?? 1;
        const url = generateWhatsAppURL({
            nama: data.name,
            hp: data.phone,
            namaMobil: carName || "belum dipilih",
            tanggalMulai: data.pickupDate,
            tanggalSelesai: data.returnDate,
            durasi,
            layanan: data.pickupLocation ? `Antar ke: ${data.pickupLocation}` : "Ambil Sendiri",
            supir: false,
            catatan: data.notes || "",
            totalEstimasi: 0,
        });
        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-2xl shadow-card p-6 md:p-8 space-y-5"
        >
            <div>
                <h2 className="text-2xl font-bold font-heading text-charcoal">
                    Formulir Pemesanan
                </h2>
                {carName && (
                    <p className="text-sm text-muted font-body mt-1">
                        Mobil: <span className="text-primary font-medium">{carName}</span>
                    </p>
                )}
            </div>

            {/* Name */}
            <Input
                label="Nama Lengkap"
                placeholder="Masukkan nama lengkap Anda"
                leftIcon={<User className="w-4 h-4" />}
                error={errors.name?.message}
                {...register("name", { required: "Nama wajib diisi" })}
            />

            {/* Phone */}
            <Input
                label="Nomor HP/WhatsApp"
                type="tel"
                placeholder="08xxxxxxxxxx"
                leftIcon={<PhoneIcon className="w-4 h-4" />}
                error={errors.phone?.message}
                {...register("phone", {
                    required: "Nomor HP wajib diisi",
                    pattern: {
                        value: /^[0-9]{9,14}$/,
                        message: "Format nomor tidak valid",
                    },
                })}
            />

            {/* Date Range Picker */}
            <div className="space-y-4">
                <div className="relative">
                    <DateRangePicker
                        placeholder="Pilih Tanggal Ambil & Kembali"
                        value={
                            pickupDate && returnDate
                                ? { from: new Date(pickupDate), to: new Date(returnDate) }
                                : undefined
                        }
                        onChange={(range: DateRange | undefined) => {
                            if (range?.from) {
                                setValue("pickupDate", format(range.from, "yyyy-MM-dd"), { shouldValidate: true });
                            } else {
                                setValue("pickupDate", "");
                            }
                            if (range?.to) {
                                setValue("returnDate", format(range.to, "yyyy-MM-dd"), { shouldValidate: true });
                            } else {
                                setValue("returnDate", "");
                            }
                        }}
                    />
                    {/* Hidden inputs to maintain form validation */}
                    <input type="hidden" {...register("pickupDate", { required: "Tanggal ambil wajib diisi" })} />
                    <input type="hidden" {...register("returnDate", { required: "Tanggal kembali wajib diisi" })} />

                    {(errors.pickupDate || errors.returnDate) && (
                        <p className="text-sm text-red-500 font-body mt-1">
                            {errors.pickupDate?.message || errors.returnDate?.message}
                        </p>
                    )}
                </div>
            </div>

            {/* Duration indicator */}
            {durationDays !== null && durationDays > 0 && (
                <p className="text-sm text-primary font-medium font-body -mt-2">
                    Durasi sewa: <strong>{durationDays} hari</strong>
                </p>
            )}

            {/* Pickup Location */}
            <Input
                label="Lokasi Pengambilan"
                placeholder="Alamat atau nama tempat (misal: Stasiun Kediri)"
                leftIcon={<MapPin className="w-4 h-4" />}
                error={errors.pickupLocation?.message}
                {...register("pickupLocation", { required: "Lokasi pengambilan wajib diisi" })}
            />

            {/* Notes */}
            <Textarea
                label="Catatan Tambahan (opsional)"
                placeholder="Kebutuhan khusus, pertanyaan, dll..."
                {...register("notes")}
            />

            {/* Submit */}
            <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isSubmitting}
                leftIcon={<Send className="w-5 h-5" />}
            >
                Kirim via WhatsApp
            </Button>

            <p className="text-xs text-center text-muted font-body">
                Dengan menekan tombol ini, Anda akan diarahkan ke WhatsApp untuk konfirmasi pesanan.
            </p>
        </form>
    );
}
