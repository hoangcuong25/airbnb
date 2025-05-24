import React from "react"
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
import { X } from "lucide-react" // icon xóa ảnh

type Props = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalAddListing = ({ open, setOpen }: Props) => {
    const [images, setImages] = React.useState<File[]>([])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files)
            setImages((prev) => [...prev, ...files]) // gộp với ảnh đã chọn trước đó
        }
    }

    const handleRemoveImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        images.forEach((image) => {
            formData.append("images", image)
        })

        // In ra dữ liệu
        for (let pair of formData.entries()) {
            console.log(pair[0] + ": ", pair[1])
        }

        setOpen(false)
        setImages([])
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
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input name="title" id="title" required />
                    </div>
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea name="description" id="description" required />
                    </div>
                    <div>
                        <Label htmlFor="pricePerNight">Price Per Night</Label>
                        <Input
                            type="number"
                            name="pricePerNight"
                            id="pricePerNight"
                            required
                            min={1}
                        />
                    </div>
                    <div>
                        <Label htmlFor="address">Address</Label>
                        <Input name="address" id="address" required />
                    </div>
                    <div>
                        <Label htmlFor="city">City</Label>
                        <Input name="city" id="city" required />
                    </div>
                    <div>
                        <Label htmlFor="country">Country</Label>
                        <Input name="country" id="country" required />
                    </div>

                    {/* Upload hình ảnh */}
                    <div>
                        <Label htmlFor="images">Images</Label>
                        <Input
                            id="images"
                            type="file"
                            accept="image/*"
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
                        <Button type="submit">Lưu</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default ModalAddListing
