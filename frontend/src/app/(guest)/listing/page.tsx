import { getListingByIdApi } from '@/api/listing.api';
import ListingDetail from './ListingDetail';

export default async function Page({ params }: { params: { id: string } }) {
    const listing = await getListingByIdApi(params.id);

    return (
        <ListingDetail listing={listing} />
    );
}
