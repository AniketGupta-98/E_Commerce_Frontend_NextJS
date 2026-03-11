"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import allUrl from "../../app/url.config.json";
import axios from "axios";
const url = allUrl.url;

export default function SignupForm() {
    const router = useRouter();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!firstName || !lastName || !email || !password) {
            setError("Please fill in all fields");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setLoading(true);
        try {
            const body = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            };
            const res = await axios.post(url + "/user/create", body);
            console.log("res", res.data);
            router.push("/login");
        } catch (error: any) {
            console.log(error);
            setError(error.response?.data?.message || "Sign up failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-slate-50 to-gray-50 px-4 py-8">
            <div className="w-full max-w-md">
                <div className="rounded-2xl bg-white shadow-xl border border-gray-200 p-8">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 mb-4">
                            <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                                />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Create an Account
                        </h1>
                        <p className="text-gray-600 mt-2 text-sm">
                            Join us to access exclusive deals
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-red-800 text-sm flex items-start gap-3">
                                <svg
                                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span>{error}</span>
                            </div>
                        )}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="John"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Doe"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                required
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-12 text-gray-900 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? (
                                        <svg
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path
                                                fillRule="evenodd"
                                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-14-14zM10 18a8 8 0 01-4.35-1.001l1.746-2.793a4 4 0 005.208 0l1.746 2.793A8 8 0 0110 18zm5.374-7.279a7.998 7.998 0 01-11.25-8.837A8 8 0 0110 2c1.342 0 2.639.263 3.82.737l-1.667 2.667a4 4 0 00-4.306 0L10 5.404l-1.747-2.8A8 8 0 0110 2c3.866 0 7.317 2.014 9.207 5.02l-3.833 6.131z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 px-4 rounded-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 transition duration-200 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg
                                        className="w-5 h-5 animate-spin"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    Creating account...
                                </>
                            ) : (
                                "Sign Up"
                            )}
                        </button>
                    </form>

                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="font-semibold text-blue-600 hover:text-blue-700 transition"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                        <p className="text-xs text-gray-500">
                            By signing up, you agree to our{" "}
                            <a href="#" className="text-gray-700 hover:underline">
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a href="#" className="text-gray-700 hover:underline">
                                Privacy Policy
                            </a>
                        </p>
                    </div>
                </div>
                <div className="mt-4 text-center">
                    <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                        <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Your data is secure and encrypted
                    </p>
                </div>
            </div>
        </div>
    );
}
