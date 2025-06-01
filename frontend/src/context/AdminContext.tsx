/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import { getAllBookingApi } from "@/api/booking.api";
import { getAllListingApi } from "@/api/listing.api";
import { getAllUser, getUser } from "@/api/user.api";
import { fetchReports } from "@/api/report.api";  // <-- import hàm fetch report
import React, { createContext, ReactNode, useEffect, useState } from "react";

interface AdminContextType {
    allUsers: UserType[];
    setAllUsers: React.Dispatch<React.SetStateAction<UserType[]>>;
    fetchAllUsers: () => Promise<void>;

    fetchAllBooking: () => Promise<void>;
    allBooking: BookingType[];
    setAllBooking: React.Dispatch<React.SetStateAction<BookingType[]>>;

    reports: ReportType[];  // thêm reports vào context
    fetchReport: () => Promise<void>;  // expose hàm fetch report
}

export const AdminContext = createContext<AdminContextType>({
    allUsers: [],
    setAllUsers: () => { },
    fetchAllUsers: async () => { },
    fetchAllBooking: async () => { },
    allBooking: [],
    setAllBooking: () => { },

    reports: [],
    fetchReport: async () => { },
});

interface AdminContextProviderProps {
    children: ReactNode;
}

const AdminContextProvider: React.FC<AdminContextProviderProps> = ({ children }) => {
    const [allUsers, setAllUsers] = useState<UserType[]>([]);
    const [allBooking, setAllBooking] = useState<BookingType[]>([]);
    const [reports, setReports] = useState<ReportType[]>([]);

    const fetchAllUsers = async () => {
        try {
            const response = await getAllUser();
            setAllUsers(response);
        } catch (error) {
            console.error("Error fetching all users data:", error);
        }
    };

    const fetchAllBooking = async () => {
        try {
            const response = await getAllBookingApi();
            setAllBooking(response);
        } catch (error) {
            console.error("Error fetching all booking data:", error);
        }
    };

    const fetchReport = async () => {
        try {
            const response = await fetchReports();
            setReports(response);
        } catch (error) {
            console.error("Error fetching reports:", error);
        }
    };

    const value = {
        allUsers, setAllUsers,
        fetchAllUsers,

        fetchAllBooking,
        allBooking, setAllBooking,

        reports,
        fetchReport,
    };

    useEffect(() => {
        fetchAllUsers();
        fetchAllBooking();
        fetchReport();
    }, []);

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;
