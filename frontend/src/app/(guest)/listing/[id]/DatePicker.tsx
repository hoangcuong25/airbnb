'use client'

import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { useState, useEffect } from "react"
import { vi } from "date-fns/locale"

type DatePickerProps = {
    data: any;
    setData: any;
};

export default function DatePicker({ data, setData }: DatePickerProps) {
    const [checkIn, setCheckIn] = useState<Date | undefined>(new Date())
    const [checkOut, setCheckOut] = useState<Date | undefined>(undefined)

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
                                // Nếu check-out đang trước check-in, cập nhật luôn
                                if (checkOut && date && checkOut <= date) {
                                    const tomorrow = new Date(date)
                                    tomorrow.setDate(tomorrow.getDate() + 1)
                                    setCheckOut(tomorrow)
                                }
                            }}
                            disabled={(date) => date < new Date()}
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
                            disabled={(date) =>
                                !checkIn || (date <= checkIn)
                            }
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}
