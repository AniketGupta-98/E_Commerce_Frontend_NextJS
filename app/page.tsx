"use client"
import { useRouter } from "next/navigation";
import { useDispatch } from 'react-redux';
import { currentUser } from '../lib/features/Auth/authSlice';
import { useEffect } from "react";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const storeUser = localStorage.getItem("user");
    if (storeUser) {
      try {
        const user = JSON.parse(storeUser);
        dispatch(currentUser(user));
        router.replace("/dashboard");
      } catch (error) {
        router.replace("/login");
      }
    } else {
      router.replace("/login");
    }
  }, [dispatch, router]);

  return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
          Loading...
      </div>
  );
}