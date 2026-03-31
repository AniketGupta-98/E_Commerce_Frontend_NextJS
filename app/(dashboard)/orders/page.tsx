import React from 'react';
import { Search, FilterList, MoreVert, Download, LocalShipping, QueryStats, AssignmentTurnedIn, LocalMall } from '@mui/icons-material';
import { IconButton, Button } from '@mui/material';

const ordersData = [
  { id: '#ORD-0098', date: 'Oct 24, 2023 at 2:30 PM', customer: 'Emma Thompson', items: 3, total: '$345.00', status: 'Delivered', avatarColor: 'bg-emerald-100 text-emerald-700' },
  { id: '#ORD-0097', date: 'Oct 23, 2023 at 11:15 AM', customer: 'Liam Neeson', items: 1, total: '$1,299.00', status: 'Shipped', avatarColor: 'bg-indigo-100 text-indigo-700' },
  { id: '#ORD-0096', date: 'Oct 23, 2023 at 09:45 AM', customer: 'Olivia Davis', items: 5, total: '$89.50', status: 'Processing', avatarColor: 'bg-fuchsia-100 text-fuchsia-700' },
  { id: '#ORD-0095', date: 'Oct 22, 2023 at 4:20 PM', customer: 'Noah Martinez', items: 2, total: '$450.00', status: 'Pending', avatarColor: 'bg-amber-100 text-amber-700' },
  { id: '#ORD-0094', date: 'Oct 21, 2023 at 1:10 PM', customer: 'Ava Garcia', items: 1, total: '$29.99', status: 'Delivered', avatarColor: 'bg-sky-100 text-sky-700' },
  { id: '#ORD-0093', date: 'Oct 20, 2023 at 5:00 PM', customer: 'William Smith', items: 4, total: '$210.00', status: 'Cancelled', avatarColor: 'bg-rose-100 text-rose-700' },
];

const getStatusStyle = (status: string) => {
    switch (status) {
        case 'Delivered': return 'bg-emerald-50/80 text-emerald-700 border-emerald-200/60 ring-1 ring-emerald-500/20';
        case 'Shipped': return 'bg-indigo-50/80 text-indigo-700 border-indigo-200/60 ring-1 ring-indigo-500/20';
        case 'Processing': return 'bg-fuchsia-50/80 text-fuchsia-700 border-fuchsia-200/60 ring-1 ring-fuchsia-500/20';
        case 'Pending': return 'bg-amber-50/80 text-amber-700 border-amber-200/60 ring-1 ring-amber-500/20';
        case 'Cancelled': return 'bg-rose-50/80 text-rose-700 border-rose-200/60 ring-1 ring-rose-500/20';
        default: return 'bg-slate-50 text-slate-700 border-slate-200';
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

export default function OrdersPage() {
    return (
        <div className="flex flex-col gap-8 max-w-[1400px] mx-auto pb-8 animate-fade-in">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-slate-900 via-indigo-900 to-indigo-800 p-8 rounded-3xl text-white shadow-lg overflow-hidden relative">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-indigo-500 opacity-20 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                    <h2 className="text-3xl font-extrabold tracking-tight mb-2 flex items-center gap-3">
                        Order Management
                    </h2>
                    <p className="text-indigo-200 text-sm font-medium">Review, process, and track customer fulfillment.</p>
                </div>
                <Button 
                    variant="outlined" 
                    startIcon={<Download fontSize="small" />}
                    className="border-white/20 text-white hover:bg-white/10 font-bold py-2.5 px-6 rounded-xl hover:-translate-y-0.5 transition-all normal-case relative z-10 bg-white/5 backdrop-blur-sm"
                >
                    Export Report
                </Button>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <StatCard 
                    title="Total Revenue (Today)" 
                    value="$12,450" 
                    icon={<QueryStats className="text-emerald-600" />} 
                    colorClass="bg-emerald-100/50"
                    trend="+24%"
                    subtext="Compared to yesterday"
                />
                <StatCard 
                    title="Orders Processing" 
                    value="42" 
                    icon={<LocalMall className="text-indigo-600" />} 
                    colorClass="bg-indigo-100/50"
                    trend="-5%"
                    subtext="Awaiting fulfillment"
                />
                <StatCard 
                    title="Shipped Today" 
                    value="156" 
                    icon={<LocalShipping className="text-blue-600" />} 
                    colorClass="bg-blue-100/50"
                    trend="+12%"
                    subtext="Tracking synced"
                />
                <StatCard 
                    title="Returns & Cancellations" 
                    value="8" 
                    icon={<AssignmentTurnedIn className="text-rose-600" />} 
                    colorClass="bg-rose-100/50"
                    trend="-2%"
                    subtext="Requires review"
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
                            placeholder="Find order by ID, customer name or status..." 
                        />
                    </div>
                    <div className="flex gap-3 w-full sm:w-auto">
                        <Button variant="outlined" startIcon={<FilterList fontSize="small" />} className="text-slate-600 border-slate-200 hover:bg-slate-50 normal-case rounded-xl px-5 font-medium shadow-sm transition-colors">
                            Timeline
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
                                <th className="py-4 pl-8">Order REF</th>
                                <th className="py-4 px-4 w-[25%]">Customer Details</th>
                                <th className="py-4 px-4">Timeline</th>
                                <th className="py-4 px-4 text-center">Items</th>
                                <th className="py-4 px-4">Amount</th>
                                <th className="py-4 px-4">Fulfillment</th>
                                <th className="py-4 pr-8 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100/80 text-sm">
                            {ordersData.map((order) => (
                                <tr key={order.id} className="hover:bg-indigo-50/30 transition-all duration-200 group cursor-pointer">
                                    <td className="py-4 pl-8">
                                        <div className="font-extrabold text-indigo-600 text-sm mb-1 group-hover:text-indigo-800 transition-colors">{order.id}</div>
                                        <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Storefront</div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-sm ring-1 ring-black/5 group-hover:scale-110 transition-transform duration-300 ${order.avatarColor}`}>
                                                {order.customer.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div className="font-bold text-slate-900 text-sm">{order.customer}</div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="text-slate-600 font-medium text-[13px]">{order.date.split(' at ')[0]}</div>
                                        <div className="text-slate-400 text-xs font-mono">{order.date.split(' at ')[1]}</div>
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        <span className="bg-slate-100 border border-slate-200/60 px-3 py-1.5 rounded-[10px] text-xs font-bold text-slate-700 shadow-sm inline-block">
                                            {order.items} <span className="text-slate-400 font-medium text-[10px] tracking-wider uppercase">QTY</span>
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 font-bold text-slate-900 text-base">{order.total}</td>
                                    <td className="py-4 px-4">
                                        <span className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold tracking-wide uppercase shadow-sm inline-flex items-center gap-2 ${getStatusStyle(order.status)}`}>
                                            {order.status === 'Shipped' && <LocalShipping sx={{fontSize: 14}} />}
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="py-4 pr-8 text-right">
                                        <Button size="small" variant="text" className="text-indigo-600 font-bold hover:bg-indigo-50 normal-case opacity-0 group-hover:opacity-100 transition-all mr-2 px-3 py-1.5 rounded-lg -translate-x-2 group-hover:translate-x-0">
                                            Manage
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
                    <div className="font-medium">Showing <span className="font-bold text-slate-800">1</span> to <span className="font-bold text-slate-800">6</span> of <span className="font-bold text-slate-800">4,192</span> orders</div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 font-bold hover:bg-slate-50 disabled:opacity-50 transition-colors shadow-sm text-xs tracking-wide" disabled>PREVIOUS</button>
                        <button className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 font-bold hover:bg-slate-50 transition-colors shadow-sm text-xs tracking-wide hover:shadow-md">NEXT</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
