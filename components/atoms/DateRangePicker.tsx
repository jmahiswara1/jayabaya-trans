"use client";

import React, { useState, useRef, useEffect } from "react";
import { format, addMonths, subMonths, addYears, subYears } from "date-fns";
import { id } from "date-fns/locale";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/style.css"; // v9 style
import { CalendarDays, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "./Button";

interface DateRangePickerProps {
    value?: DateRange;
    onChange?: (range: DateRange | undefined) => void;
    placeholder?: string;
    className?: string;
}

export default function DateRangePicker({ value, onChange, placeholder = "Pilih Tanggal", className }: DateRangePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [tempRange, setTempRange] = useState<DateRange | undefined>(value);
    const [month, setMonth] = useState<Date>(new Date());
    const ref = useRef<HTMLDivElement>(null);

    // Sync temp range when opened
    useEffect(() => {
        if (isOpen) {
            setTempRange(value);
            if (value?.from) setMonth(value.from);
        }
    }, [isOpen, value]);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleApply = () => {
        onChange?.(tempRange);
        setIsOpen(false);
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    const formatRange = (range?: DateRange) => {
        if (!range?.from) return "";
        if (!range.to) return format(range.from, "dd MMM yyyy", { locale: id });
        return `${format(range.from, "dd MMM yyyy", { locale: id })} - ${format(range.to, "dd MMM yyyy", { locale: id })}`;
    };

    return (
        <div className={cn("relative", className)} ref={ref}>
            {/* Trigger Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="block text-sm font-semibold font-body text-charcoal">
                        Tanggal Ambil
                    </label>
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className={cn(
                            "flex items-center gap-2 w-full px-4 py-3 rounded-xl border bg-white font-body text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20",
                            isOpen ? "border-primary ring-2 ring-primary/20" : "border-gray-200 hover:border-gray-300",
                            !value?.from ? "text-muted" : "text-charcoal font-medium"
                        )}
                    >
                        <CalendarDays className="w-4 h-4 text-muted shrink-0" />
                        <span className="truncate flex-1 text-left">
                            {value?.from ? format(value.from, "dd MMM yyyy", { locale: id }) : placeholder}
                        </span>
                    </button>
                </div>

                <div className="space-y-1.5">
                    <label className="block text-sm font-semibold font-body text-charcoal">
                        Tanggal Kembali
                    </label>
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className={cn(
                            "flex items-center gap-2 w-full px-4 py-3 rounded-xl border bg-white font-body text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20",
                            isOpen ? "border-primary ring-2 ring-primary/20" : "border-gray-200 hover:border-gray-300",
                            !value?.to ? "text-muted" : "text-charcoal font-medium"
                        )}
                    >
                        <CalendarDays className="w-4 h-4 text-muted shrink-0" />
                        <span className="truncate flex-1 text-left">
                            {value?.to ? format(value.to, "dd MMM yyyy", { locale: id }) : "Pilih Tanggal"}
                        </span>
                    </button>
                </div>
            </div>

            {/* Popover */}
            {isOpen && (
                <div className="absolute z-50 mt-2 p-4 bg-white rounded-2xl shadow-xl border border-gray-100 w-[300px] left-0 sm:left-auto sm:right-0">

                    {/* Custom Navigation Header matching reference */}
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex gap-1">
                            <button type="button" onClick={() => setMonth(subYears(month, 1))} className="p-1.5 border border-gray-100 rounded-lg hover:bg-surface text-muted transition-colors">
                                <ChevronsLeft className="w-4 h-4" />
                            </button>
                            <button type="button" onClick={() => setMonth(subMonths(month, 1))} className="p-1.5 border border-gray-100 rounded-lg hover:bg-surface text-muted transition-colors">
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="font-bold text-sm font-body text-charcoal">
                            {format(month, "MMMM yyyy", { locale: id })}
                        </div>
                        <div className="flex gap-1">
                            <button type="button" onClick={() => setMonth(addMonths(month, 1))} className="p-1.5 border border-gray-100 rounded-lg hover:bg-surface text-muted transition-colors">
                                <ChevronRight className="w-4 h-4" />
                            </button>
                            <button type="button" onClick={() => setMonth(addYears(month, 1))} className="p-1.5 border border-gray-100 rounded-lg hover:bg-surface text-muted transition-colors">
                                <ChevronsRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <DayPicker
                        mode="range"
                        selected={tempRange}
                        onSelect={setTempRange}
                        month={month}
                        disabled={{ before: new Date() }}
                        showOutsideDays
                        className="font-body m-0"
                        classNames={{
                            nav: "hidden", // Hide default navigation entirely
                            months: "flex flex-col sm:flex-row",
                            month: "space-y-3",
                            month_caption: "hidden", // Hide default caption
                            table: "w-full border-collapse space-y-1",
                            head_row: "flex w-full justify-between mb-1",
                            head_cell: "text-muted font-medium text-[11px] w-8 text-center",
                            row: "flex w-full justify-between mt-1",
                            cell: "relative p-0 text-center text-[13px] focus-within:relative focus-within:z-20",
                            day: "h-8 w-8 p-0 font-medium rounded-lg hover:bg-surface transition-colors aria-selected:opacity-100",
                            day_button: "h-8 w-8 flex items-center justify-center rounded-lg outline-none",
                            range_start: "bg-surface text-charcoal rounded-l-lg",
                            range_end: "bg-black text-white rounded-r-lg hover:bg-black",
                            range_middle: "bg-surface/50 text-charcoal rounded-none",
                            selected: "bg-black text-white hover:bg-black hover:text-white focus:bg-black focus:text-white",
                            today: "text-primary font-bold",
                            outside: "text-gray-300 opacity-50",
                            disabled: "text-gray-300 opacity-50 cursor-not-allowed",
                        }}
                    />

                    {/* Footer Actions */}
                    <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-100">
                        <Button type="button" variant="outline" fullWidth onClick={handleCancel} className="py-2.5">
                            Cancel
                        </Button>
                        <Button type="button" variant="primary" fullWidth onClick={handleApply}>
                            Apply
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
