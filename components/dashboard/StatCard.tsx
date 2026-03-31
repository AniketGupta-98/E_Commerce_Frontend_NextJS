import React from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    trend?: number;
    icon: React.ReactNode;
    color?: 'blue' | 'green' | 'orange' | 'purple';
}

export default function StatCard({ title, value, trend, icon, color = 'blue' }: StatCardProps) {
    const colorStyles = {
        blue: 'bg-blue-50 text-blue-600',
        green: 'bg-green-50 text-green-600',
        orange: 'bg-orange-50 text-orange-600',
        purple: 'bg-indigo-50 text-indigo-600',
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${colorStyles[color]}`}>
                    {icon}
                </div>
            </div>
            
            {trend !== undefined && (
                <div className="mt-4 flex items-center text-sm">
                    <span 
                        className={`font-medium flex items-center ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}
                    >
                        {trend >= 0 ? '+' : ''}{trend}%
                    </span>
                    <span className="text-gray-500 ml-2">vs last month</span>
                </div>
            )}
        </div>
    );
}
