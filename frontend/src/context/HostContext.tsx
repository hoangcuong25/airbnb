/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import { getMyListingApi } from "@/api/listing.api";
import React, { createContext, ReactNode, useEffect, useState } from "react";

interface HostContextType {
    findMyListing: () => Promise<void>;
    hostListings: ListingType[];
    setHostListings: React.Dispatch<React.SetStateAction<ListingType[]>>;
}

export const HostContext = createContext<HostContextType>({
    findMyListing: async () => { },
    hostListings: [],
    setHostListings: () => { }
});

interface HostContextProviderProps {
    children: ReactNode;
}

const HostContextProvider: React.FC<HostContextProviderProps> = ({ children }) => {

    const [hostListings, setHostListings] = useState<ListingType[]>([]);

    const findMyListing = async () => {
        try {
            const response = await getMyListingApi();
            setHostListings(response);
        }
        catch (error) {
            console.error("Failed to fetch host listings:", error);
        }
    }

    const value = {
        findMyListing,
        hostListings,
        setHostListings
    };

    useEffect(() => {
        findMyListing();
    }, []);

    return (
        <HostContext.Provider value={value}>
            {children}
        </HostContext.Provider>
    );
};

export default HostContextProvider;