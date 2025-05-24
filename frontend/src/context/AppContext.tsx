/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import { getAllListingApi } from "@/api/listing.api";
import { getAllUser, getUser } from "@/api/user.api";
import React, { createContext, ReactNode, useEffect, useState } from "react";

interface AppContextType {
    user: UserType | null;
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
    fetchUser: () => Promise<void>;
}

export const AppContext = createContext<AppContextType>({
    user: null,
    setUser: () => { },
    fetchUser: async () => { },
});

interface AppContextProviderProps {
    children: ReactNode;
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserType | null>(null);;

    const fetchUser = async () => {
        try {
            const reponse = await getUser();

            setUser(reponse);

        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }

    const value = {
        user, setUser,
        fetchUser,
    };

    useEffect(() => {
        const isToken = localStorage.getItem('access_token');

        if (isToken) {
            fetchUser()
        }
    }, []);

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;