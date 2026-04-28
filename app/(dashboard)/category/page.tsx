'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import allUrl from '../../url.config.json';
import { useAppSelector } from '@/lib/useAppselector';

import CategoryPageHeader from '@/components/dashboard/category/CategoryPageHeader';
import CategorySearchFilter from '@/components/dashboard/category/CategorySearchFilter';
import CategoryTable from '@/components/dashboard/category/CategoryTable';
import AddCategoryDialog from '@/components/dashboard/category/AddCategoryDialog';
import EditCategoryDialog from '@/components/dashboard/category/EditCategoryDialog';

import {
    Dialog, DialogTitle, DialogContent, DialogContentText,
    DialogActions, Button, Snackbar, Alert,
} from '@mui/material';
import { WarningAmberRounded } from '@mui/icons-material';

const url = allUrl.url;

const EMPTY_ADD = { name: '', description: '' };

export default function CategoryPage() {
    const user = useAppSelector((state) => state.user.user);
    const headerConfig = { headers: { Authorization: user?.accessToken } };

    // ── Data ────────────────────────────────────────────────────────────────
    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        try {
            axios
                .get(url + '/all/category', headerConfig)
                .then((res) => {
                    const data = res.data.data;
                    setCategories(Array.isArray(data) ? data : []);
                })
                .catch((err) => console.log(err));
        } catch { /* silent */ }
    };

    // ── Pagination ───────────────────────────────────────────────────────────
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // ── Search ───────────────────────────────────────────────────────────────
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setPage(0);
    };

    const filteredCategories = categories.filter((cat) => {
        const name = (cat.name).toLowerCase();
        const desc = (cat.description || '').toLowerCase();
        const q = searchQuery.toLowerCase();
        return name.includes(q) || desc.includes(q);
    });

    // ── Add Dialog ───────────────────────────────────────────────────────────
    const [addOpen, setAddOpen] = useState(false);
    const [addData, setAddData] = useState(EMPTY_ADD);

    const handleAddClick = () => {
        setAddData(EMPTY_ADD);
        setAddOpen(true);
    };

    const handleAddSubmit = () => {
        try {
            axios
                .post(url + '/category', addData, headerConfig)
                .then(() => {
                    setAddOpen(false);
                    fetchCategories();
                    setSnackbar({ open: true, message: `Category "${addData.name}" created successfully.`, severity: 'success' });
                })
                .catch((err) => {
                    const msg = err?.response?.status === 409
                        ? 'A category with that name already exists.'
                        : 'Failed to create category. Please try again.';
                    setSnackbar({ open: true, message: msg, severity: 'error' });
                });
        } catch { /* silent */ }
    };

    // ── Edit Dialog ──────────────────────────────────────────────────────────
    const [editOpen, setEditOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);

    const handleEditClick = (cat: any) => {
        setSelectedCategory({ ...cat });
        setEditOpen(true);
    };

    const handleEditClose = () => {
        setEditOpen(false);
        setSelectedCategory(null);
    };

    const handleEditSave = () => {
        try {
            const id = selectedCategory.categoryId ?? selectedCategory.id;
            const body = {
                name: selectedCategory.name ?? selectedCategory.categoryName,
                description: selectedCategory.description,
            };
            axios
                .put(url + `/category/${id}`, body, headerConfig)
                .then(() => {
                    fetchCategories();
                    setSnackbar({ open: true, message: 'Category updated successfully.', severity: 'success' });
                    setEditOpen(false);
                })
                .catch(() => {
                    setSnackbar({ open: true, message: 'Failed to update category. Please try again.', severity: 'error' });
                });
        } catch { /* silent */ }
    };

    // ── Delete Dialog ────────────────────────────────────────────────────────
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<any>(null);

    const handleDeleteClick = (cat: any) => {
        setCategoryToDelete(cat);
        setDeleteOpen(true);
    };

    const handleDeleteCancel = () => {
        setDeleteOpen(false);
        setCategoryToDelete(null);
    };

    const handleDeleteConfirm = () => {
        setDeleteOpen(false);
        try {
            const id = categoryToDelete?.categoryId ?? categoryToDelete?.id;
            axios
                .delete(`${url}/category/${id}`, headerConfig)
                .then(() => {
                    fetchCategories();
                    setSnackbar({
                        open: true,
                        message: `"${categoryToDelete?.name ?? categoryToDelete?.categoryName}" deleted successfully.`,
                        severity: 'success',
                    });
                    setCategoryToDelete(null);
                })
                .catch(() => {
                    setSnackbar({ open: true, message: 'Failed to delete category. Please try again.', severity: 'error' });
                    setCategoryToDelete(null);
                });
        } catch { /* silent */ }
    };

    // ── Snackbar ─────────────────────────────────────────────────────────────
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false, message: '', severity: 'success',
    });

    return (
        <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-8 animate-fade-in">

            {/* Page Header */}
            <CategoryPageHeader
                totalCount={categories.length}
                onAddClick={handleAddClick}
            />

            {/* Table Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                {/* Search */}
                <CategorySearchFilter
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                />

                {/* Table */}
                <CategoryTable
                    filteredCategories={filteredCategories}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={(_, newPage) => setPage(newPage)}
                    onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
                    onEditClick={handleEditClick}
                    onDeleteClick={handleDeleteClick}
                />
            </div>

            {/* Add Category Dialog */}
            <AddCategoryDialog
                open={addOpen}
                data={addData}
                onClose={() => setAddOpen(false)}
                onSubmit={handleAddSubmit}
                onChange={setAddData}
            />

            {/* Edit Category Dialog */}
            <EditCategoryDialog
                open={editOpen}
                selectedCategory={selectedCategory}
                onClose={handleEditClose}
                onSave={handleEditSave}
                onChange={setSelectedCategory}
            />

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteOpen} onClose={handleDeleteCancel} maxWidth="xs" fullWidth>
                <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#e11d48', fontWeight: 700 }}>
                    <WarningAmberRounded sx={{ color: '#f43f5e' }} />
                    Confirm Deletion
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete{' '}
                        <strong>
                            &quot;{categoryToDelete?.name ?? categoryToDelete?.categoryName ?? 'this category'}&quot;
                        </strong>?
                        This action <strong>cannot be undone</strong> and may affect related products.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
                    <Button
                        onClick={handleDeleteCancel}
                        variant="outlined"
                        sx={{ textTransform: 'none', borderColor: '#cbd5e1', color: '#475569', '&:hover': { background: '#f8fafc' } }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDeleteConfirm}
                        variant="contained"
                        sx={{ textTransform: 'none', background: '#f43f5e', '&:hover': { background: '#e11d48' }, fontWeight: 700 }}
                    >
                        Yes, Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: '100%', borderRadius: 2, fontWeight: 600 }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
}
