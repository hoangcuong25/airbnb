export { };

declare global {
    type UserType = {
        id: number;
        name: string;
        email: string;
        avatar: string;
        age: number;
        gender: string;
        dob: string;
        address: string;
        phone: string;
        isVerified: boolean;
        role: string;
        createdAt?: string;
        updatedAt?: string;
        createdBy?: string;
        updatedBy?: string;
    }

    type UserUpdateResponseType = {
        id: string;
        name: string;
        avatar: string;
        age: string;
        gender: genderEnum;
        dob: string;
        address: string;
        phone: string;
    }

    enum genderEnum {
        MALE = 'MALE',
        FEMALE = 'FEMALE',
        OTHER = 'OTHER'
    }

    type ImageListing = {
        id: number
        listingId: number
        url: string
        name: string
    }

    type ListingType = {
        id: number;
        title: string;
        description: string;
        pricePerNight: number;
        address: string;
        city: string;
        country: string;
        host: UserType;
        hostId: number;
        maxGuests: number;

        images: ImageListing[];

        createdAt: string;
        updatedAt: string;
    }

    type statusEnum = {
        PENDING: 'PENDING';
        CONFIRMED: 'CONFIRMED';
        CANCELLED: 'CANCELLED';
        COMPLETED: 'COMPLETED';
    }

    type BookingType = {
        id: number;
        listing: ListingType;
        listingId: number;
        user: UserType;
        userId: number;
        checkInDate: string;
        checkOutDate: string;
        totalPrice: number;
        status: statusEnum;
        guestNumber: number;

        createdAt: string;
        updatedAt: string;
    }
}