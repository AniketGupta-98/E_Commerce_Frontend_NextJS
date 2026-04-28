import React from 'react';
import { primaryColor, primaryGradient, muiSx } from '@/lib/theme';
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
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border" style={{ backgroundColor: primaryColor[50], color: primaryColor[700], borderColor: primaryColor[100] }}>
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
                    ...muiSx.primaryContainedButton,
                    px: 3,
                    py: 1.1,
                    fontSize: '0.875rem',
                    boxShadow: primaryGradient.shadow,
                }}
            >
                Add Category
            </Button>
        </div>
    );
}
