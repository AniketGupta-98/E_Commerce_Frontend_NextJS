"use client"
import { useEffect } from "react";
import LoginForm from "../../../components/auth/LoginForm";
import { useDispatch } from 'react-redux';
import { currentUser } from '../../../lib/features/Auth/authSlice';
import { redirect } from "next/navigation";

export default function LoginPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        const storeUser=localStorage.getItem("user")
        if (!storeUser) {
            console.log("storeUser",storeUser)
            const user = JSON.parse(storeUser);
            dispatch(currentUser(user));
            redirect("/dashboard");
        } else {
            redirect("/login");
        }
    }, [])
    return (
        <main>
            <LoginForm />
        </main>
    );
}
