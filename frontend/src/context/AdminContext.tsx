/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import { getAllBookingApi } from "@/api/booking.api";
import { getAllListingApi } from "@/api/listing.api";
import { getAllUser, getUser } from "@/api/user.api";
import React, { createContext, ReactNode, useEffect, useState } from "react";

interface AdminContextType {
    allUsers: UserType[];
    setAllUsers: React.Dispatch<React.SetStateAction<UserType[]>>;
    fetchAllUsers: () => Promise<void>;
    fetchAllBooking: () => Promise<void>
    allBooking: BookingType[]
    setAllBooking: React.Dispatch<React.SetStateAction<BookingType[]>>;
}

export const AdminContext = createContext<AdminContextType>({
    allUsers: [],
    setAllUsers: () => { },
    fetchAllUsers: async () => { },
    fetchAllBooking: async () => { },
    allBooking: [],
    setAllBooking: () => { },
});

interface AdminContextProviderProps {
    children: ReactNode;
}

const AdminContextProvider: React.FC<AdminContextProviderProps> = ({ children }) => {
    const [allUsers, setAllUsers] = useState<UserType[]>([]);
    const [allBooking, setAllBooking] = useState<BookingType[]>([])

    const fetchAllUsers = async () => {
        try {
            const response = await getAllUser();

            setAllUsers(response);
        } catch (error) {
            console.error("Error fetching all users data:", error);
        }
    }

    const fetchAllBooking = async () => {
        try {
            const response = await getAllBookingApi();

            setAllBooking(response);
        } catch (error) {
            console.error("Error fetching all users data:", error);
        }
    }

    const value = {
        allUsers, setAllUsers,
        fetchAllUsers,
        fetchAllBooking,
        allBooking, setAllBooking
    };

    useEffect(() => {
        fetchAllUsers()
        fetchAllBooking()
    }, []);

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;