import React from 'react';
import { Search } from '@mui/icons-material';
import { primaryColor } from '@/lib/theme';

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
                    className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white sm:text-sm transition-all"
                    style={{
                        // Dynamic focus styles via CSS custom property — driven by theme
                        '--tw-ring-color': primaryColor[500],
                    } as React.CSSProperties}
                    onFocus={e => {
                        e.currentTarget.style.borderColor = primaryColor[500];
                        e.currentTarget.style.boxShadow  = `0 0 0 2px ${primaryColor[50]}`;
                    }}
                    onBlur={e => {
                        e.currentTarget.style.borderColor = '';
                        e.currentTarget.style.boxShadow  = '';
                    }}
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
