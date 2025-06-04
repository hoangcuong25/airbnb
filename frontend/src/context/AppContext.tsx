/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import { LogoutApi } from "@/api/auth.api";
import { getAllListingApi } from "@/api/listing.api";
import { getUser } from "@/api/user.api";
import { fetchUserWishlistApi } from "@/api/wishlist.api";
import { useRouter } from "next/navigation";
import React, { createContext, ReactNode, useEffect, useState } from "react";

interface AppContextType {
    user: UserType | null;
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
    fetchUser: () => Promise<void>;
    listings: ListingType[];
    setListings: React.Dispatch<React.SetStateAction<ListingType[]>>;
    fetchAllListings: () => Promise<void>;
    logout: () => Promise<void>;
    userWishlist: any
    setUserWishlist: React.Dispatch<React.SetStateAction<any>>;
    fetchUserWishlist: () => Promise<void>
    textingWith: UserType | null;
    setTextingWith: React.Dispatch<React.SetStateAction<UserType | null>>;
}

export const AppContext = createContext<AppContextType>({
    user: null,
    setUser: () => { },
    fetchUser: async () => { },
    listings: [],
    setListings: () => { },
    fetchAllListings: async () => { },
    logout: async () => { },
    userWishlist: null,
    setUserWishlist: () => { },
    fetchUserWishlist: async () => { },
    textingWith: null,
    setTextingWith: () => { }
});

interface AppContextProviderProps {
    children: ReactNode;
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {

    const route = useRouter();

    const [user, setUser] = useState<UserType | null>(null);
    const [listings, setListings] = useState<ListingType[]>([]);
    const [userWishlist, setUserWishlist] = useState()

    const [textingWith, setTextingWith] = useState<UserType | null>(null)

    const fetchUser = async () => {
        try {
            const reponse = await getUser();

            setUser(reponse);

        } catch (error) {
            console.error("Error fetching user data:", error);
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

    const logout = async () => {
        try {
            localStorage.removeItem('access_token');
            setUser(null);
            route.push('/login');

            await LogoutApi();

        } catch (error) {
            console.error("Error during logout:", error);
        }
    }

    const fetchUserWishlist = async () => {
        try {
            const response = await fetchUserWishlistApi()

            setUserWishlist(response)
        }
        catch (error) {
            console.error("Error:", error);
        }
    }

    const value = {
        user, setUser,
        fetchUser,
        listings, setListings,
        fetchAllListings,
        logout,
        userWishlist, setUserWishlist,
        fetchUserWishlist,
        textingWith, setTextingWith
    };

    useEffect(() => {
        const isToken = localStorage.getItem('access_token');

        if (isToken) {
            fetchUser()
            fetchUserWishlist()
        }

        fetchAllListings()
    }, []);

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;