"use client"
import { redirect } from "next/navigation";
import { useDispatch } from 'react-redux';
import { currentUser } from '../lib/features/Auth/authSlice';

export default function Home() {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user) {
      dispatch(currentUser(user));
      return redirect("/dashboard");
    }else{
      return redirect("/login");
    }  
}