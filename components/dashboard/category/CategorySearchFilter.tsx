import React from 'react';
import { Search } from '@mui/icons-material';

interface CategorySearchFilterProps {
    searchQuery: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CategorySearchFilter({
    searchQuery,
    onSearchChange,
}: CategorySearchFilterProps) {
    return (
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white">
            {/* Search Input */}
            <div className="relative w-full sm:w-96">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Search fontSize="small" />
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={onSearchChange}
                    className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-indigo-500 sm:text-sm transition-all"
                    placeholder="Search by category name or description..."
                />
            </div>

            {/* Stats pill */}
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                Categories are shown across your storefront
            </div>
        </div>
    );
}
