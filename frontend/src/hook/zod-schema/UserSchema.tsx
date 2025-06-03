import { z } from "zod"

export const genderEnum = z.enum(["MALE", "FEMALE", "OTHER"], {
    errorMap: () => ({ message: "Giới tính phải là MALE, FEMALE hoặc OTHER" }),
})

export const updateUserSchema = z.object({
    id: z.number({ required_error: "ID là bắt buộc", invalid_type_error: "ID phải là số" }),
    name: z.string({ invalid_type_error: "Tên phải là chuỗi" }).optional(),
    avatar: z
        .string({ invalid_type_error: "Ảnh đại diện phải là chuỗi" })
        .url("Ảnh đại diện phải là URL hợp lệ")
        .optional(),
    age: z
        .coerce
        .number({ invalid_type_error: "Tuổi phải là số" })
        .int("Tuổi phải là số nguyên")
        .nonnegative("Tuổi không được âm")
        .optional(),
    gender: genderEnum.optional(),
    dob: z
        .string({ invalid_type_error: "Ngày sinh phải là chuỗi định dạng ngày" })
        .optional(),
    address: z.string({ invalid_type_error: "Địa chỉ phải là chuỗi" }).optional(),
    phone: z.string({ invalid_type_error: "Số điện thoại phải là chuỗi" }).optional(),
})

export type UpdateUserInput = z.infer<typeof updateUserSchema>
