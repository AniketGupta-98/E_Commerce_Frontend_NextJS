'use client';

import React from 'react';
import { primaryColor, muiSx } from '@/lib/theme';
import { Close, CategoryOutlined } from '@mui/icons-material';
import {
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from '@mui/material';

interface AddCategoryData {
    name: string;
    description: string;
}

interface AddCategoryDialogProps {
    open: boolean;
    data: AddCategoryData;
    onClose: () => void;
    onSubmit: () => void;
    onChange: (updated: AddCategoryData) => void;
}

export default function AddCategoryDialog({
    open,
    data,
    onClose,
    onSubmit,
    onChange,
}: AddCategoryDialogProps) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{ className: 'rounded-2xl shadow-xl border border-slate-100 p-2' }}
        >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: primaryColor[50] }}>
                        <CategoryOutlined fontSize="small" sx={{ color: primaryColor[500] }} />
                    </div>
                    <DialogTitle className="p-0 text-xl font-bold text-slate-800 tracking-tight">
                        Add New Category
                    </DialogTitle>
                </div>
                <IconButton
                    onClick={onClose}
                    size="small"
                    className="text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                    <Close fontSize="small" />
                </IconButton>
            </div>

            {/* Content */}
            <DialogContent className="px-6 py-6 border-none">
                <div className="grid grid-cols-1 gap-5">
                    <TextField
                        label="Category Name"
                        variant="outlined"
                        fullWidth
                        value={data.name}
                        onChange={(e) => onChange({ ...data, name: e.target.value })}
                        placeholder="e.g. Electronics, Clothing…"
                        size="medium"
                        autoFocus
                    />
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={3}
                        value={data.description}
                        onChange={(e) => onChange({ ...data, description: e.target.value })}
                        placeholder="Brief description of this category (optional)"
                        size="medium"
                    />
                </div>
            </DialogContent>

            {/* Actions */}
            <DialogActions className="px-6 py-4 justify-between border-t border-slate-100">
                <Button
                    onClick={onClose}
                    className="text-slate-600 font-medium normal-case hover:bg-slate-50 px-4 py-2 rounded-lg"
                >
                    Cancel
                </Button>
                <Button
                    onClick={onSubmit}
                    variant="contained"
                    disabled={!data.name.trim()}
                    disableElevation
                    sx={{ ...muiSx.primaryContainedButton, px: 3, py: 1 }}
                >
                    Create Category
                </Button>
            </DialogActions>
        </Dialog>
    );
}
