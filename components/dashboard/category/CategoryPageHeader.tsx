import React from 'react';
import { AddCircleOutline } from '@mui/icons-material';
import { Button } from '@mui/material';

interface CategoryPageHeaderProps {
    totalCount: number;
    onAddClick: () => void;
}

export default function CategoryPageHeader({ totalCount, onAddClick }: CategoryPageHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-1 tracking-tight">
                    Product Categories
                </h2>
                <p className="text-slate-500 text-sm">
                    Manage and organise your store&apos;s product categories.
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100">
                        {totalCount} total
                    </span>
                </p>
            </div>

            <Button
                variant="contained"
                onClick={onAddClick}
                startIcon={<AddCircleOutline fontSize="small" />}
                disableElevation
                sx={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                    '&:hover': { background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)' },
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: '10px',
                    px: 3,
                    py: 1.1,
                    fontSize: '0.875rem',
                    boxShadow: '0 4px 14px 0 rgba(99,102,241,0.3)',
                }}
            >
                Add Category
            </Button>
        </div>
    );
}
