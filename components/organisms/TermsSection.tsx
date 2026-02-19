/**
 * TermsSection organism
 * Displays rental terms and conditions
 * Used on booking page and syarat-ketentuan page
 */

import { Info } from "lucide-react";

const terms = [
    "Sewa minimal 1 hari (24 jam).",
    "Pembayaran dapat dilakukan secara tunai atau transfer bank.",
    "Bahan bakar ditanggung penyewa.",
    "Dilarang membawa unit keluar pulau tanpa izin tertulis.",
    "Penyewa bertanggung jawab atas kerusakan dan kehilangan kendaraan.",
    "Wajib menyertakan KTP asli dan SIM C/A yang masih berlaku.",
    "Kendaraan harus dikembalikan dalam kondisi yang sama.",
    "Keterlambatan pengembalian dikenakan denda per jam.",
    "Pembatalan H-1 sebelum jadwal akan dikenakan biaya 50%.",
];

export default function TermsSection() {
    return (
        <section className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <div className="flex items-start gap-3 mb-4">
                <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <h3 className="text-lg font-bold font-heading text-blue-900">
                    Syarat &amp; Ketentuan Sewa
                </h3>
            </div>
            <ul className="space-y-2.5">
                {terms.map((term, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-blue-800 font-body">
                        <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                            {idx + 1}
                        </span>
                        {term}
                    </li>
                ))}
            </ul>
        </section>
    );
}
