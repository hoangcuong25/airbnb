import { z } from "zod"

export const ListingSchema = z.object({
    title: z.string().min(1, "Tiêu đề là bắt buộc"),
    description: z.string().min(1, "Mô tả là bắt buộc"),
    pricePerNight: z.coerce.number().min(1, "Giá mỗi đêm phải ít nhất là 1"),
    address: z.string().min(1, "Địa chỉ là bắt buộc"),
    city: z.string().min(1, "Thành phố là bắt buộc"),
    country: z.string().min(1, "Quốc gia là bắt buộc"),
    maxGuests: z.coerce.number().min(1, "Số khách tối đa phải ít nhất là 1"),
})
