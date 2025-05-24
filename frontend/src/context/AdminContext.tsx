/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import { getAllListingApi } from "@/api/listing.api";
import { getAllUser, getUser } from "@/api/user.api";
import React, { createContext, ReactNode, useEffect, useState } from "react";

interface AdminContextType {
    allUsers: UserType[];
    setAllUsers: React.Dispatch<React.SetStateAction<UserType[]>>;
    fetchAllUsers: () => Promise<void>;
    formatDateUTC: (date: string | Date) => string;
    listings: ListingType[];
    setListings: React.Dispatch<React.SetStateAction<ListingType[]>>;
    fetchAllListings: () => Promise<void>;
}

export const AdminContext = createContext<AdminContextType>({
    allUsers: [],
    setAllUsers: () => { },
    fetchAllUsers: async () => { },
    formatDateUTC: (date: string | Date) => '',
    listings: [],
    setListings: () => { },
    fetchAllListings: async () => { },
});

interface AdminContextProviderProps {
    children: ReactNode;
}

const AdminContextProvider: React.FC<AdminContextProviderProps> = ({ children }) => {
    const [allUsers, setAllUsers] = useState<UserType[]>([]);

    const [listings, setListings] = useState<ListingType[]>([]);

    const fetchAllUsers = async () => {
        try {
            const response = await getAllUser();

            setAllUsers(response);
        } catch (error) {
            console.error("Error fetching all users data:", error);
        }
    }

    const fetchAllListings = async () => {
        try {
            const response = await getAllListingApi();

            setListings(response);
        }
        catch (error) {
            console.error("Error fetching all listings data:", error);
        }
    }

    const formatDateUTC = (date: string | Date) => {
        const format: string = 'dd/MM/yyyy HH:mm:ss'

        const d = new Date(date)

        const day = d.getUTCDate().toString().padStart(2, '0')
        const month = (d.getUTCMonth() + 1).toString().padStart(2, '0')
        const year = d.getUTCFullYear().toString()
        const hours = d.getUTCHours().toString().padStart(2, '0')
        const minutes = d.getUTCMinutes().toString().padStart(2, '0')
        const seconds = d.getUTCSeconds().toString().padStart(2, '0')

        return format
            .replace('dd', day)
            .replace('MM', month)
            .replace('yyyy', year)
            .replace('HH', hours)
            .replace('mm', minutes)
            .replace('ss', seconds)
    }

    const value = {
        allUsers, setAllUsers,
        fetchAllUsers,
        formatDateUTC,
        listings, setListings,
        fetchAllListings
    };

    useEffect(() => {
        const isToken = localStorage.getItem('access_token');

        fetchAllListings()
        fetchAllUsers()
    }, []);

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;