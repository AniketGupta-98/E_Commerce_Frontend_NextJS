"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!username || !password) {
            setError("Please enter both fields");
            return;
        }

        setLoading(true);
        try {
            await new Promise((r) => setTimeout(r, 700));
            document.cookie = "token=demo-token; path=/; max-age=86400";
            router.push("/products");
        } catch {
            setError("Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-700 via-indigo-700 to-cyan-600 px-4">
            <div className="relative w-full max-w-md rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8">

                {/* Accent Glow */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-500/30 rounded-full blur-3xl"></div>

                {/* Header */}
                <div className="text-center mb-8 relative">
                    <h1 className="text-3xl font-extrabold text-white">
                        Welcome Back
                    </h1>
                    <p className="text-white/80 mt-2 text-sm">
                        Sign in to continue shopping
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5 relative">
                    {error && (
                        <div className="rounded-xl bg-red-500/20 px-4 py-2 text-red-100 text-sm">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm text-white/90 mb-1">
                            Email or Username
                        </label>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-2.5 text-white placeholder:text-white/60 outline-none focus:ring-4 focus:ring-pink-400/30"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-white/90 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-2.5 text-white placeholder:text-white/60 outline-none focus:ring-4 focus:ring-pink-400/30"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl py-3 font-semibold bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 text-white hover:opacity-90 disabled:opacity-60 transition"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>

                    <div className="text-center">
                        <a className="text-sm text-white/80 underline hover:text-white" href="#">
                            Forgot password?
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}
