import React, { useContext } from "react"
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { ListingSchema } from "@/hook/zod-schema/ListingSchema"
import { createListingApi } from "@/api/listing.api"
import { toast } from "sonner"
import { AppContext } from "@/context/AppContext"

type Props = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

type ListingFormData = z.infer<typeof ListingSchema>

const ModalAddListing = ({ open, setOpen }: Props) => {

    const { fetchAllListings } = useContext(AppContext)

    const [images, setImages] = React.useState<File[]>([])

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ListingFormData>({
        resolver: zodResolver(ListingSchema),
    })

    const onSubmit = async (data: ListingFormData) => {

        const formData = new FormData()

        // Thêm các trường văn bản
        formData.append("title", data.title)
        formData.append("description", data.description)
        formData.append("pricePerNight", data.pricePerNight.toString())
        formData.append("address", data.address)
        formData.append("city", data.city)
        formData.append("country", data.country)

        // Thêm ảnh (images[] là File[])
        images.forEach((file) => {
            formData.append("images", file)
        })

        try {
            const response = await createListingApi(formData)

            await fetchAllListings() // Cập nhật danh sách sau khi thêm mới

            toast.success("Thêm phòng thành công")
        } catch (error) {
            toast.error("Thêm phòng thất bại")
        }

        setOpen(false)
        setImages([])
        reset()
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files)
            setImages((prev) => [...prev, ...files]) // gộp với ảnh đã chọn trước đó
        }
    }

    const handleRemoveImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index))
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="mb-6">
                    <button
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors duration-200"
                        onClick={() => setOpen(true)}
                    >
                        Thêm phòng mới
                    </button>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Thêm phòng mới</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input disabled={isSubmitting} id="title" {...register("title")} />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea disabled={isSubmitting} id="description" {...register("description")} />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="pricePerNight">Price Per Night</Label>
                        <Input disabled={isSubmitting} type="number" id="pricePerNight" {...register("pricePerNight")} />
                        {errors.pricePerNight && <p className="text-red-500 text-sm">{errors.pricePerNight.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="address">Address</Label>
                        <Input disabled={isSubmitting} id="address" {...register("address")} />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="city">City</Label>
                        <Input disabled={isSubmitting} id="city" {...register("city")} />
                        {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="country">Country</Label>
                        <Input disabled={isSubmitting} id="country" {...register("country")} />
                        {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
                    </div>

                    {/* Upload hình ảnh */}
                    <div>
                        <Label htmlFor="images">Images</Label>
                        <Input
                            id="images"
                            type="file"
                            accept="image/*"
                            disabled={isSubmitting}
                            multiple
                            onChange={handleImageChange}
                        />
                        {images.length > 0 && (
                            <div className="grid grid-cols-3 gap-3 mt-3">
                                {images.map((img, idx) => (
                                    <div
                                        key={idx}
                                        className="relative group border rounded-md overflow-hidden"
                                    >
                                        <img
                                            src={URL.createObjectURL(img)}
                                            alt={`preview-${idx}`}
                                            className="w-full h-24 object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(idx)}
                                            className="absolute top-1 right-1 bg-white rounded-full p-1 shadow group-hover:opacity-100 opacity-80 hover:bg-red-100 transition"
                                        >
                                            <X className="w-4 h-4 text-red-500" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Đang lưu..." : "Lưu"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default ModalAddListing
