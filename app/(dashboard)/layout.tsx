"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { currentUser } from "@/lib/features/Auth/authSlice";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const dispatch = useDispatch();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storeUser = localStorage.getItem("user");
        if (storeUser) {
            try {
                const user = JSON.parse(storeUser);
                dispatch(currentUser(user));
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to parse user from local storage", error);
                router.replace("/login");
            }
        } else {
            router.replace("/login");
        }
    }, [dispatch, router]);

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center bg-slate-50">Loading...</div>;
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar />

            <div className="flex flex-col flex-1 min-w-0 bg-slate-50">
                <Header />
                <main className="p-6 sm:p-8 flex-1 overflow-auto">
                    <div className="mx-auto max-w-7xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
