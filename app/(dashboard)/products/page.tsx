"use client"


import React, { useEffect, useState } from 'react';
import { Search, FilterList, MoreVert, Add, TrendingUp, Inventory, WarningAmber, ShoppingCartCheckout } from '@mui/icons-material';
import { IconButton, Button, Box } from '@mui/material';
import { useAppSelector } from "@/lib/useAppselector";
import allUrl from "../../url.config.json"
import axios from "axios";
const url = allUrl.url

const productsData = [
    { id: 'PRD-101', name: 'Wireless Ergonomic Keyboard', category: 'Electronics', price: '$129.99', stock: 45, status: 'In Stock', image: '⌨️', trend: '+12%' },
    { id: 'PRD-102', name: 'Ultra HD 4K Monitor, 32-inch', category: 'Computing', price: '$499.00', stock: 12, status: 'Low Stock', image: '🖥️', trend: '+5%' },
    { id: 'PRD-103', name: 'Noise Cancelling Headphones', category: 'Audio', price: '$249.50', stock: 0, status: 'Out of Stock', image: '🎧', trend: '-2%' },
    { id: 'PRD-104', name: 'Leather Smart Wallet', category: 'Accessories', price: '$59.90', stock: 120, status: 'In Stock', image: '👝', trend: '+24%' },
    { id: 'PRD-105', name: 'Fitness Smartwatch Pro', category: 'Wearables', price: '$199.00', stock: 3, status: 'Low Stock', image: '⌚', trend: '+18%' },
    { id: 'PRD-106', name: 'Portable SSD 2TB', category: 'Storage', price: '$159.99', stock: 85, status: 'In Stock', image: '💽', trend: '+3%' },
];

const getStockStyle = (status: string) => {
    switch (status) {
        case 'In Stock': return 'text-emerald-700 bg-emerald-50/80 border-emerald-200/60 ring-1 ring-emerald-500/20';
        case 'Low Stock': return 'text-amber-700 bg-amber-50/80 border-amber-200/60 ring-1 ring-amber-500/20';
        case 'Out of Stock': return 'text-rose-700 bg-rose-50/80 border-rose-200/60 ring-1 ring-rose-500/20';
        default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
};

const StatCard = ({ title, value, icon, trend, subtext, colorClass }: any) => (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className={`absolute top-0 right-0 p-8 ${colorClass} opacity-5 group-hover:opacity-10 transition-opacity rounded-bl-full`} />
        <div className="flex justify-between items-start mb-4 relative z-10">
            <div className={`p-2.5 rounded-xl ${colorClass}`}>
                {icon}
            </div>
            {trend && (
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {trend}
                </span>
            )}
        </div>
        <div className="relative z-10">
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">{value}</h3>
            <p className="text-sm font-medium text-slate-500 mt-1">{title}</p>
        </div>
        {subtext && <p className="text-xs text-slate-400 mt-3 border-t border-slate-100 pt-3">{subtext}</p>}
    </div>
);
export interface Category {
  _id: string;
  name: string;
}

export interface Product {
    _id: string;
    productId: string;
    title: string;
    description: string;
    status: string;
    price: number;
    stock: number;
    category: Category;
    images: string[];
    brand: string;
    ratings: number;
    totalReviews: number;
    isFeatured: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export default function ProductsPage() {

    const user = useAppSelector((state) => state.user.user);

    const headerConfig = { headers: { Authorization: user?.accessToken } };

    const [ProductList, setProductList] = useState<Product[]>([]);

    useEffect(() => {
        getAllProductList();
    }, [])

    const getAllProductList = () => {
        try {
            axios
                .get(url + "/productslist", headerConfig)
                .then((res) => {
                    // setusersData(res.data.user)
                    const allList = res.data.data;
                    setProductList(res.data.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch {
            // setError("Login failed. Please try again.");
        } finally {
            // setLoading(false);
        }
    }


    return (
        <div className="flex flex-col gap-8 max-w-[1400px] mx-auto pb-8 animate-fade-in">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-slate-900 to-indigo-900 p-8 rounded-3xl text-white shadow-lg overflow-hidden relative">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                    <h2 className="text-3xl font-extrabold tracking-tight mb-2 flex items-center gap-3">
                        Products Inventory
                    </h2>
                    <p className="text-indigo-200 text-sm font-medium">Manage your inventory, pricing, and active listings.</p>
                </div>
                <Button
                    variant="contained"
                    startIcon={<Add fontSize="small" />}
                    className="bg-white text-indigo-900 hover:bg-slate-50 font-bold py-2.5 px-6 rounded-xl shadow-xl hover:-translate-y-0.5 transition-all normal-case relative z-10"
                    disableElevation
                >
                    Add Product
                </Button>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <StatCard
                    title="Total Products"
                    value="1,284"
                    icon={<Inventory className="text-indigo-600" />}
                    colorClass="bg-indigo-100/50"
                    trend="+12%"
                    subtext="Across 14 categories"
                />
                <StatCard
                    title="Low Stock Alerts"
                    value="24"
                    icon={<WarningAmber className="text-amber-600" />}
                    colorClass="bg-amber-100/50"
                    trend="-3%"
                    subtext="Items under 15 units"
                />
                <StatCard
                    title="Units Sold Today"
                    value="342"
                    icon={<ShoppingCartCheckout className="text-emerald-600" />}
                    colorClass="bg-emerald-100/50"
                    trend="+18%"
                    subtext="Updated 5 mins ago"
                />
                <StatCard
                    title="Total Inventory Value"
                    value="$142.5k"
                    icon={<TrendingUp className="text-blue-600" />}
                    colorClass="bg-blue-100/50"
                    trend="+4%"
                    subtext="Based on current stock"
                />
            </div>

            {/* Main Table Card */}
            <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                <div className="p-6 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/50 backdrop-blur-md">
                    <div className="relative w-full sm:w-[400px]">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                            <Search fontSize="small" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-12 pr-4 py-2.5 border border-slate-200 hover:border-slate-300 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white focus:border-indigo-500 sm:text-sm transition-all"
                            placeholder="Find products by name, category, or SKU..."
                        />
                    </div>
                    <div className="flex gap-3 w-full sm:w-auto">
                        <Button variant="outlined" startIcon={<FilterList fontSize="small" />} className="text-slate-600 border-slate-200 hover:bg-slate-50 normal-case rounded-xl px-5 font-medium shadow-sm transition-colors">
                            Category
                        </Button>
                        <Button variant="outlined" startIcon={<FilterList fontSize="small" />} className="text-slate-600 border-slate-200 hover:bg-slate-50 normal-case rounded-xl px-5 font-medium shadow-sm transition-colors">
                            Status
                        </Button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="bg-slate-50/80 border-y border-slate-200 text-[11px] uppercase tracking-widest text-slate-500 font-bold">
                                <th className="py-4 pl-8 w-16">Image</th>
                                <th className="py-4 px-4 w-[35%]">Product Details</th>
                                <th className="py-4 px-4">Category</th>
                                <th className="py-4 px-4">Price</th>
                                <th className="py-4 px-4 text-center">Stock</th>
                                <th className="py-4 px-4">Status</th>
                                <th className="py-4 pr-8 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100/80 text-sm">
                            {ProductList.map((product, id) => (
                                <tr key={id} className="hover:bg-indigo-50/30 transition-all duration-200 group cursor-pointer">
                                    <td className="py-4 pl-8">
                                        <div className="w-14 h-14 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-slate-200 group-hover:scale-110 transition-transform duration-300">
                                            <Box
                                                component="img"
                                                src={product.images?.[0]}
                                                alt={product.title}
                                            />
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="font-bold text-slate-900 text-base mb-1 group-hover:text-indigo-600 transition-colors">{product.title}</div>
                                        <div className="flex gap-3 items-center">
                                            <span className="text-xs text-slate-400 font-mono tracking-wide">{product.productId}</span>
                                            {/* <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 rounded-full py-0.5">{product.trend} last 7d</span> */}
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="text-slate-600 font-medium text-sm">{product.category.name}</span>
                                    </td>
                                    <td className="py-4 px-4 font-bold text-slate-900 text-[15px]">{product.price}</td>
                                    <td className="py-4 px-4 text-center">
                                        <div className="flex flex-col items-center">
                                            <span className={`font-bold text-base ${product.stock <= 15 ? (product.stock === 0 ? 'text-rose-600' : 'text-amber-600') : 'text-slate-700'}`}>
                                                {product.stock}
                                            </span>
                                            {product.stock > 0 && product.stock <= 15 && (
                                                <span className="text-[10px] uppercase font-bold text-amber-500 mt-0.5 tracking-wider">Low</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold tracking-wide uppercase shadow-sm inline-block ${getStockStyle(product.status)}`}>
                                            <span className="flex items-center gap-1.5">
                                                <span className={`w-2 h-2 rounded-full ${product.status === 'In Stock' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' :
                                                    product.status === 'Low Stock' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]' : 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]'
                                                    }`}></span>
                                                {product.status}
                                            </span>
                                        </span>
                                    </td>
                                    <td className="py-4 pr-8 text-right">
                                        <Button size="small" variant="text" className="text-indigo-600 font-bold hover:bg-indigo-50 normal-case opacity-0 group-hover:opacity-100 transition-all mr-2 px-3 py-1.5 rounded-lg -translate-x-2 group-hover:translate-x-0">
                                            Edit
                                        </Button>
                                        <IconButton size="small" className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all">
                                            <MoreVert fontSize="medium" />
                                        </IconButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-5 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500 bg-slate-50/50">
                    <div className="font-medium">Showing <span className="font-bold text-slate-800">1</span> to <span className="font-bold text-slate-800">6</span> of <span className="font-bold text-slate-800">1,284</span> entries</div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 font-bold hover:bg-slate-50 disabled:opacity-50 transition-colors shadow-sm text-xs tracking-wide" disabled>PREVIOUS</button>
                        <button className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 font-bold hover:bg-slate-50 transition-colors shadow-sm text-xs tracking-wide hover:shadow-md">NEXT</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
























