import React, { Dispatch, SetStateAction, useContext } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AppContext } from '@/context/AppContext';
import { hostDeleteListingApi } from '@/api/listing.api';
import { toast } from 'sonner';
import { HostContext } from '@/context/HostContext';


interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    listingId: string | null;
}

const AlertDialogDeleteListing = ({ open, setOpen, listingId }: Props) => {

    const { fetchAllListings } = useContext(AppContext);
    const { findMyListing } = useContext(HostContext);

    const handleDelete = async () => {
        if (!listingId) {
            console.error("Không tìm thấy phòng để xoá.");
            return;
        }

        try {
            await hostDeleteListingApi(listingId);

            toast.success("Xoá phòng thành công.");

            fetchAllListings();
            findMyListing()

        } catch (error) {
            toast.error("Đã xảy ra lỗi khi xoá phòng.");
        } finally {
            setOpen(false);
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Bạn có chắc chắn muốn xoá?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Hành động này không thể hoàn tác. Dữ liệu phòng sẽ bị xoá khỏi hệ thống.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Huỷ</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Xoá</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AlertDialogDeleteListing