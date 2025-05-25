import React, { useContext, useEffect } from "react"
import {
    Dialog,
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
import { toast } from "sonner"
import { AppContext } from "@/context/AppContext"

type Props = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    listing: ListingType
}

type ListingFormData = z.infer<typeof ListingSchema>

type ExistingImage = {
    id: number
    url: string
    isNew: false
}

type NewImage = {
    file: File
    isNew: true
}

type ImageState = ExistingImage | NewImage

const ModalUpdateListing = ({ open, setOpen, listing }: Props) => {
    const { fetchAllListings } = useContext(AppContext)
    const [images, setImages] = React.useState<ImageState[]>([])

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ListingFormData>({
        resolver: zodResolver(ListingSchema),
        defaultValues: {
            title: listing.title,
            description: listing.description,
            pricePerNight: listing.pricePerNight,
            address: listing.address,
            city: listing.city,
            country: listing.country,
        },
    })

    useEffect(() => {
        const initialImages: ExistingImage[] = listing.images.map((img) => ({
            id: img.id,
            url: img.url,
            isNew: false,
        }))
        setImages(initialImages)

        reset({
            title: listing.title,
            description: listing.description,
            pricePerNight: listing.pricePerNight,
            address: listing.address,
            city: listing.city,
            country: listing.country,
        })
    }, [listing, reset])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files).map((file) => ({
                file,
                isNew: true as const,
            }))
            setImages((prev) => [...prev, ...files])
        }
    }

    const handleRemoveImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index))
    }

    const onSubmit = async (data: ListingFormData) => {
        const formData = new FormData()

        formData.append("title", data.title)
        formData.append("description", data.description)
        formData.append("pricePerNight", data.pricePerNight.toString())
        formData.append("address", data.address)
        formData.append("city", data.city)
        formData.append("country", data.country)

        // Append ảnh mới
        images.forEach((img) => {
            if (img.isNew) {
                formData.append("images", img.file)
            }
        })

        // Tìm các ảnh cũ đã bị xóa
        const originalIds = listing.images.map((img) => img.id)

        const currentOldImageIds = images
            .filter((img) => !img.isNew)
            .map((img) => (img as ExistingImage).id)

        const removedImageIds = originalIds.filter(
            (id) => !currentOldImageIds.includes(id)
        )

        removedImageIds.forEach((id) =>
            formData.append("removedImageIds", id.toString())
        )

        try {
            // await updateListingApi(listing.id, formData)

            await fetchAllListings()
            toast.success("Cập nhật thành công")
        } catch {
            toast.error("Cập nhật thất bại")
        }

        setOpen(false)
        setImages([])
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Cập nhật phòng</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" {...register("title")} disabled={isSubmitting} />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" {...register("description")} disabled={isSubmitting} />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="pricePerNight">Price Per Night</Label>
                        <Input type="number" id="pricePerNight" {...register("pricePerNight")} disabled={isSubmitting} />
                        {errors.pricePerNight && <p className="text-red-500 text-sm">{errors.pricePerNight.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" {...register("address")} disabled={isSubmitting} />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" {...register("city")} disabled={isSubmitting} />
                        {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="country">Country</Label>
                        <Input id="country" {...register("country")} disabled={isSubmitting} />
                        {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
                    </div>

                    {/* Upload hình ảnh */}
                    <div>
                        <Label htmlFor="images">Images</Label>
                        <Input
                            id="images"
                            type="file"
                            accept="image/*"
                            multiple
                            disabled={isSubmitting}
                            onChange={handleImageChange}
                        />
                        {images.length > 0 && (
                            <div className="grid grid-cols-3 gap-3 mt-3">
                                {images.map((img, idx) => (
                                    <div key={idx} className="relative group border rounded-md overflow-hidden">
                                        <img
                                            src={img.isNew ? URL.createObjectURL(img.file) : img.url}
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
                            {isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default ModalUpdateListing
