'use client'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { Star } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { reviewApi } from '@/api/review.api'

const ModalReview = ({ listingId }: { listingId: number }) => {
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmitReview = async () => {
        if (!rating || !review.trim()) {
            toast.error('Vui lòng chọn sao và nhập nhận xét.')
            return
        }

        try {
            setLoading(true)
            const response = await reviewApi({
                listingId,
                rating,
                comment: review,
            })

            toast.success('Đánh giá đã được gửi!')
            setRating(0)
            setReview('')
        } catch (error: any) {
            const message =
                error?.response?.data?.message || 'Gửi đánh giá thất bại, vui lòng thử lại.'
            toast.error(message)
        } finally {
            setLoading(false)
        }
    }


    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Đánh giá</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Đánh giá chỗ ở</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="rating">Đánh giá sao</Label>
                            <div className="flex space-x-1 mt-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        size={24}
                                        onClick={() => setRating(star)}
                                        className={`cursor-pointer ${rating >= star ? 'text-yellow-500' : 'text-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="review">Nhận xét</Label>
                            <Textarea
                                id="review"
                                placeholder="Hãy chia sẻ trải nghiệm của bạn..."
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                            />
                        </div>

                        <button
                            onClick={handleSubmitReview}
                            disabled={loading}
                            className="w-full bg-pink-800 hover:bg-pink-900 text-white rounded-lg py-2 font-semibold disabled:opacity-60"
                        >
                            {loading ? 'Đang gửi...' : 'Gửi đánh giá'}
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ModalReview
