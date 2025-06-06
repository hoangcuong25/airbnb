// components/ModalReport.tsx
'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { reportApi } from '@/api/report.api'
import { toast } from 'sonner'

export default function ModalReport({ listingId }: { listingId: number }) {
    const [open, setOpen] = useState(false)
    const [reason, setReason] = useState('')

    const handleReport = async () => {
        try {
            await reportApi({ listingId, reason })
            toast.success('Gửi báo cáo thành công')
            setOpen(false)
            setReason('')
        } catch (err) {
            toast.error('Gửi báo cáo thất bại')
        }
    }

    return (
        <>
            <Button variant="outline" onClick={() => setOpen(true)} className="text-red-500 border-red-400 hover:bg-red-50">
                Báo cáo phòng
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Lý do báo cáo</DialogTitle>
                    </DialogHeader>

                    <Textarea
                        placeholder="Nhập lý do bạn muốn báo cáo phòng này..."
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        rows={4}
                    />

                    <Button onClick={handleReport} className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white">
                        Gửi báo cáo
                    </Button>
                </DialogContent>
            </Dialog>
        </>
    )
}
