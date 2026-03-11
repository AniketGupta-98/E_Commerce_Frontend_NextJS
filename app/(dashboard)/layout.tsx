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

            <div className="flex flex-col flex-1 min-w-0">
                <Header />
                <main className="p-6 bg-gray-100 flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
