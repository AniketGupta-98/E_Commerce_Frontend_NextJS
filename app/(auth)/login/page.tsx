"use client"
import { useEffect, useState } from "react";
import LoginForm from "../../../components/auth/LoginForm";
import { useDispatch } from 'react-redux';
import { currentUser } from '../../../lib/features/Auth/authSlice';
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storeUser = localStorage.getItem("user");
        if (storeUser) {
            try {
                const user = JSON.parse(storeUser);
                dispatch(currentUser(user));
                router.replace("/dashboard");
            } catch (error) {
                 setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    }, [dispatch, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-slate-50 to-gray-50">
                Loading...
            </div>
        );
    }

    return (
        <main>
            <LoginForm />
        </main>
    );
}
