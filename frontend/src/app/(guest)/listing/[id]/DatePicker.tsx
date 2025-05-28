'use client'

import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { useState, useEffect, useMemo } from "react"
import { vi } from "date-fns/locale"

type DatePickerProps = {
    data: any;
    setData: any;
    blockedDates: string[];
};

export default function DatePicker({ data, setData, blockedDates }: DatePickerProps) {
    const [checkIn, setCheckIn] = useState<Date | undefined>(undefined)
    const [checkOut, setCheckOut] = useState<Date | undefined>(undefined)

    // Tạo set để check nhanh ngày bị khóa (chuyển string thành toDateString)
    const blockedDatesSet = useMemo(() => {
        return new Set(blockedDates.map(d => new Date(d).toDateString()))
    }, [blockedDates])

    // Hàm check ngày có bị khóa không
    const isDateBlocked = (date: Date) => {
        return blockedDatesSet.has(date.toDateString())
    }

    // Cập nhật data khi checkIn hoặc checkOut thay đổi
    useEffect(() => {
        if (checkIn && checkOut) {
            setData((prev: any) => ({
                ...prev,
                checkInDate: checkIn.toISOString().split("T")[0],
                checkOutDate: checkOut.toISOString().split("T")[0],
            }))
        }
    }, [checkIn, checkOut])

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
                                // Nếu check-out đang trước check-in, cập nhật thành ngày kế tiếp check-in
                                if (checkOut && date && checkOut <= date) {
                                    const tomorrow = new Date(date)
                                    tomorrow.setDate(tomorrow.getDate() + 1)
                                    setCheckOut(tomorrow)
                                }
                            }}
                            disabled={(date) => {
                                // Disable ngày trong quá khứ và ngày bị khóa
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
                            onSelect={setCheckOut}
                            disabled={(date) => {
                                // Disable ngày trước hoặc bằng check-in hoặc ngày bị khóa
                                return !checkIn || date <= checkIn || isDateBlocked(date)
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}
