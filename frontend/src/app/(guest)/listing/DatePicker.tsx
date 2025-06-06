'use client'

import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { useState } from "react"
import { vi } from "date-fns/locale"

type DatePickerProps = {
    data: any;
    setData: any;
    blockedDates: string[];
};

export default function DatePicker({ data, setData, blockedDates }: DatePickerProps) {
    const [checkIn, setCheckIn] = useState<Date | undefined>(undefined)
    const [checkOut, setCheckOut] = useState<Date | undefined>(undefined)

    // Tạo set để check nhanh ngày bị khóa
    const blockedDatesSet = new Set(blockedDates.map(d => new Date(d).toDateString()))

    // Hàm check ngày có bị khóa không
    const isDateBlocked = (date: Date) => {
        return blockedDatesSet.has(date.toDateString())
    }

    return (
        <div className="grid grid-cols-2 gap-2 text-sm">
            {/* Check-in */}
            <div>
                <label className="block font-medium mb-1">Nhận phòng</label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full text-left">
                            {checkIn ? format(checkIn, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày"}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={checkIn}
                            onSelect={(date) => {
                                setCheckIn(date)
                                if (date) {
                                    setData((prev: any) => ({
                                        ...prev,
                                        checkInDate: date.toISOString().split("T")[0],
                                    }))
                                }
                            }}
                            disabled={(date) => {
                                const today = new Date()
                                today.setHours(0, 0, 0, 0)
                                return date < today || isDateBlocked(date)
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>

            {/* Check-out */}
            <div>
                <label className="block font-medium mb-1">Trả phòng</label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full text-left">
                            {checkOut ? format(checkOut, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày"}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={checkOut}
                            onSelect={(date) => {
                                setCheckOut(date)
                                if (date) {
                                    setData((prev: any) => ({
                                        ...prev,
                                        checkOutDate: date.toISOString().split("T")[0],
                                    }))
                                }
                            }}
                            disabled={(date) => {
                                return !checkIn || date <= checkIn || isDateBlocked(date)
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}
