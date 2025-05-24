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
}

export const AdminContext = createContext<AdminContextType>({
    allUsers: [],
    setAllUsers: () => { },
    fetchAllUsers: async () => { },
});

interface AdminContextProviderProps {
    children: ReactNode;
}

const AdminContextProvider: React.FC<AdminContextProviderProps> = ({ children }) => {
    const [allUsers, setAllUsers] = useState<UserType[]>([]);

    const fetchAllUsers = async () => {
        try {
            const response = await getAllUser();

            setAllUsers(response);
        } catch (error) {
            console.error("Error fetching all users data:", error);
        }
    }

    const value = {
        allUsers, setAllUsers,
        fetchAllUsers,
    };

    useEffect(() => {
        const isToken = localStorage.getItem('access_token');

        fetchAllUsers()
    }, []);

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;