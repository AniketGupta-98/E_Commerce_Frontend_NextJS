import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
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
