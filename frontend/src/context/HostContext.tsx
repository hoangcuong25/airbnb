/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import { getHostBookingApi } from "@/api/booking.api";
import { getMyListingApi } from "@/api/listing.api";
import React, { createContext, ReactNode, useEffect, useState } from "react";

interface HostContextType {
    findMyListing: () => Promise<void>;
    hostListings: ListingType[];
    setHostListings: React.Dispatch<React.SetStateAction<ListingType[]>>;
    getHostBookings: () => Promise<void>;
    hostBookings: any[];
    setHostBookings: React.Dispatch<React.SetStateAction<any[]>>;
}

export const HostContext = createContext<HostContextType>({
    findMyListing: async () => { },
    hostListings: [],
    setHostListings: () => { },
    getHostBookings: async () => { },
    hostBookings: [],
    setHostBookings: () => { },
});

interface HostContextProviderProps {
    children: ReactNode;
}

const HostContextProvider: React.FC<HostContextProviderProps> = ({ children }) => {

    const [hostListings, setHostListings] = useState<ListingType[]>([]);
    const [hostBookings, setHostBookings] = useState<any[]>([])

    const findMyListing = async () => {
        try {
            const response = await getMyListingApi();
            setHostListings(response);
        }
        catch (error) {
            console.error("Failed to fetch host listings:", error);
        }
    }

    const getHostBookings = async () => {
        try {
            const response = await getHostBookingApi()
            setHostBookings(response)
        }
        catch (error) {
            console.error("Failed to fetch host bookings:", error);
        }
    }

    const value = {
        findMyListing,
        hostListings,
        setHostListings,
        getHostBookings,
        hostBookings, setHostBookings
    };

    useEffect(() => {
        findMyListing();
        getHostBookings()
    }, []);

    return (
        <HostContext.Provider value={value}>
            {children}
        </HostContext.Provider>
    );
};

export default HostContextProvider;