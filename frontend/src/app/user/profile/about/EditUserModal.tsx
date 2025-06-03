"use client"

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    updateUserSchema,
    UpdateUserInput,
    genderEnum,
} from "@/hook/zod-schema/UserSchema"
import { useState } from "react"
import { updateProfile } from "@/api/user.api"
import { toast } from "sonner"

export function EditUserModal({ user, fetchUser }: { user: UpdateUserInput, fetchUser: any }) {
    const [open, setOpen] = useState(false)
    const [avatarPreview, setAvatarPreview] = useState(user.avatar)

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<UpdateUserInput>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            ...user,
            dob: user.dob ? new Date(user.dob).toISOString().split("T")[0] : "",
        },
    })

    // Xử lý chọn file ảnh
    const onAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const result = reader.result as string
                setAvatarPreview(result)
                setValue("avatar", result) // Lưu base64 tạm thời nếu cần
            }
            reader.readAsDataURL(file)
        }
    }

    // Xử lý submit form
    const onSubmit = async (data: UpdateUserInput) => {
        try {
            // Tạo FormData để gửi file ảnh + data
            const formData = new FormData()
            formData.append("id", data.id.toString())
            formData.append("name", data.name ?? "")
            formData.append("age", data.age !== undefined ? data.age.toString() : "")
            formData.append("gender", data.gender ?? "")
            formData.append("dob", data.dob ?? "")
            formData.append("address", data.address ?? "")
            formData.append("phone", data.phone ?? "")

            // Nếu user chọn file mới thì thêm file vào FormData
            const avatarInput = document.querySelector<HTMLInputElement>('input[type="file"]')
            if (avatarInput?.files?.[0]) {
                formData.append("image", avatarInput.files[0])  // Trùng với @UseInterceptors(FileInterceptor('image'))
            }

            // Gọi API update profile
            await updateProfile(formData)
            await fetchUser()

            toast.success("Cập nhật thành công")
            setOpen(false)
        } catch (error) {
            console.error(error)
            toast.error("Cập nhật thất bại")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="px-4 py-2 bg-gray-300 border-none rounded-md cursor-pointer">
                    Chỉnh sửa
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Chỉnh sửa người dùng</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Tên</Label>
                        <Input {...register("name")} />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    <div>
                        <Label className="mb-1" htmlFor="avatar">Ảnh đại diện</Label>

                        {avatarPreview && (
                            <img
                                src={avatarPreview}
                                alt="Avatar Preview"
                                className="w-24 h-24 rounded-full object-cover mb-2"
                            />
                        )}

                        <Input
                            type="file"
                            accept="image/*"
                            onChange={onAvatarFileChange}
                        />

                        {errors.avatar && <p className="text-red-500 text-sm">{errors.avatar.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="age">Tuổi</Label>
                        <Input type="number" {...register("age")} />
                        {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="gender">Giới tính</Label>
                        <select
                            {...register("gender")}
                            className="w-full border rounded-md px-3 py-2"
                            defaultValue={user.gender || ""}
                        >
                            <option value="">-- Chọn giới tính --</option>
                            {genderEnum.options.map((g) => (
                                <option key={g} value={g}>
                                    {g}
                                </option>
                            ))}
                        </select>
                        {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="dob">Ngày sinh</Label>
                        <Input type="date" {...register("dob")} />
                        {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="address">Địa chỉ</Label>
                        <Input {...register("address")} />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="phone">Số điện thoại</Label>
                        <Input {...register("phone")} />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                    </div>

                    <Button type="submit">Lưu thay đổi</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
