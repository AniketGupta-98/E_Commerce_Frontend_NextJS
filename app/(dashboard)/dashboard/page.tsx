import React from "react";
import StatCard from "@/components/dashboard/StatCard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import RecentOrders from "@/components/dashboard/RecentOrders";
import TopProducts from "@/components/dashboard/TopProducts";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";

export default function DashboardPage() {
    return (
        <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-8">
            {/* Header / Greeting */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Dashboard Overview</h2>
                <p className="text-gray-500 text-sm">Welcome back! Here's what's happening with your store today.</p>
            </div>

            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Total Revenue" 
                    value="$124,563.00" 
                    trend={12.5} 
                    icon={<AttachMoneyIcon />} 
                    color="blue" 
                />
                <StatCard 
                    title="Total Orders" 
                    value="4,239" 
                    trend={8.2} 
                    icon={<ShoppingCartIcon />} 
                    color="green" 
                />
                <StatCard 
                    title="Total Products" 
                    value="1,294" 
                    trend={-2.4} 
                    icon={<InventoryIcon />} 
                    color="orange" 
                />
                <StatCard 
                    title="Active Users" 
                    value="892" 
                    trend={14.1} 
                    icon={<PeopleIcon />} 
                    color="purple" 
                />
            </div>

            {/* Middle Section: Chart & Top Products */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <RevenueChart />
                </div>
                <div className="lg:col-span-1">
                    <TopProducts />
                </div>
            </div>

            {/* Bottom Section: Recent Orders */}
            <div>
                <RecentOrders />
            </div>
        </div>
    );
}
