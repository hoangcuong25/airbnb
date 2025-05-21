/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import { getAllUser, getUser } from "@/api/user.api";
import React, { createContext, ReactNode, useEffect, useState } from "react";

interface AppContextType {
    user: UserType | null;
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
    fetchUser: () => Promise<void>;
    allUsers: UserType[];
    setAllUsers: React.Dispatch<React.SetStateAction<UserType[]>>;
    fetchAllUsers: () => Promise<void>;
    formatDateUTC: (date: string | Date) => string;
}

export const AppContext = createContext<AppContextType>({
    user: null,
    setUser: () => { },
    fetchUser: async () => { },
    allUsers: [],
    setAllUsers: () => { },
    fetchAllUsers: async () => { },
    formatDateUTC: (date: string | Date) => '',
});

interface AppContextProviderProps {
    children: ReactNode;
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [allUsers, setAllUsers] = useState<UserType[]>([]);

    const fetchUser = async () => {
        try {
            const reponse = await getUser();

            setUser(reponse);

        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }

    const fetchAllUsers = async () => {
        try {
            const response = await getAllUser();

            setAllUsers(response);
        } catch (error) {
            console.error("Error fetching all users data:", error);
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
        user, setUser,
        fetchUser,
        allUsers, setAllUsers,
        fetchAllUsers,
        formatDateUTC
    };

    useEffect(() => {
        const isToken = localStorage.getItem('access_token');

        if (isToken) {
            fetchUser()
        }

        fetchAllUsers()
    }, []);

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;