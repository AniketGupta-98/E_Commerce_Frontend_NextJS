'use client';

import React from 'react';
import { Close, EditOutlined } from '@mui/icons-material';
import {
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from '@mui/material';

interface EditCategoryDialogProps {
    open: boolean;
    selectedCategory: any;
    onClose: () => void;
    onSave: () => void;
    onChange: (updated: any) => void;
}

export default function EditCategoryDialog({
    open,
    selectedCategory,
    onClose,
    onSave,
    onChange,
}: EditCategoryDialogProps) {
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
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center">
                        <EditOutlined fontSize="small" sx={{ color: '#6366f1' }} />
                    </div>
                    <DialogTitle className="p-0 text-xl font-bold text-slate-800 tracking-tight">
                        Edit Category
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
                {selectedCategory && (
                    <div className="grid grid-cols-1 gap-5">
                        <TextField
                            label="Category Name"
                            variant="outlined"
                            fullWidth
                            value={selectedCategory.name || selectedCategory.categoryName || ''}
                            onChange={(e) => onChange({ ...selectedCategory, name: e.target.value })}
                            size="medium"
                            autoFocus
                        />
                        <TextField
                            label="Description"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={3}
                            value={selectedCategory.description || ''}
                            onChange={(e) => onChange({ ...selectedCategory, description: e.target.value })}
                            placeholder="Brief description of this category (optional)"
                            size="medium"
                        />
                    </div>
                )}
            </DialogContent>

            {/* Actions */}
            <DialogActions className="px-6 py-4 justify-between border-t border-slate-100">
                <Button
                    onClick={onClose}
                    className="text-slate-600 font-medium normal-case hover:bg-slate-50 px-4 py-2 rounded-lg"
                >
                    Discard Changes
                </Button>
                <Button
                    onClick={onSave}
                    variant="contained"
                    disabled={!selectedCategory?.name?.trim() && !selectedCategory?.categoryName?.trim()}
                    disableElevation
                    sx={{
                        background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                        '&:hover': { background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)' },
                        '&:disabled': { opacity: 0.5, background: '#a5b4fc' },
                        textTransform: 'none',
                        fontWeight: 600,
                        borderRadius: '10px',
                        px: 3,
                        py: 1,
                    }}
                >
                    Save Changes
                </Button>
            </DialogActions>
        </Dialog>
    );
}
