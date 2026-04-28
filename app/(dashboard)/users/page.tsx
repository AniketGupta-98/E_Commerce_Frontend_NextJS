'use client';

import React, { useState } from 'react';
import {
    useUsers,
    useCreateUser,
    useUpdateUser,
    useDeleteUser,
} from '@/lib/hooks/useUsers';

import UserPageHeader from '@/components/dashboard/users/UserPageHeader';
import UserSearchFilter from '@/components/dashboard/users/UserSearchFilter';
import UserTable from '@/components/dashboard/users/UserTable';
import EditUserDialog from '@/components/dashboard/users/EditUserDialog';
import InviteUserDialog from '@/components/dashboard/users/InviteUserDialog';
import {
    Dialog, DialogTitle, DialogContent, DialogContentText,
    DialogActions, Button, Snackbar, Alert, CircularProgress,
} from '@mui/material';
import { WarningAmberRounded } from '@mui/icons-material';

export default function UsersPage() {
    // ── TanStack Query ───────────────────────────────────────────────────────
    const { data: usersData = [], isLoading } = useUsers();
    const createUser = useCreateUser();
    const updateUser = useUpdateUser();
    const deleteUser = useDeleteUser();

    // ── Pagination ──────────────────────────────────────────────────────────
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // ── Search & Filters ────────────────────────────────────────────────────
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [roleAnchorEl, setRoleAnchorEl] = useState<null | HTMLElement>(null);
    const [statusAnchorEl, setStatusAnchorEl] = useState<null | HTMLElement>(null);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setPage(0);
    };

    const handleRoleClick = (e: React.MouseEvent<HTMLButtonElement>) => setRoleAnchorEl(e.currentTarget);
    const handleRoleClose = (role?: string) => {
        if (typeof role === 'string') setRoleFilter(role);
        setRoleAnchorEl(null);
        setPage(0);
    };

    const handleStatusClick = (e: React.MouseEvent<HTMLButtonElement>) => setStatusAnchorEl(e.currentTarget);
    const handleStatusClose = (status?: string) => {
        if (typeof status === 'string') setStatusFilter(status);
        setStatusAnchorEl(null);
        setPage(0);
    };

    const filteredUsers = usersData?.filter((u) => {
        const fullName = `${u.Fname || ''} ${u.Lname || ''}`.trim().toLowerCase();
        const email = (u.email || '').toLowerCase();
        const search = searchQuery.toLowerCase();
        const matchesSearch = fullName.includes(search) || email.includes(search);
        const matchesRole = roleFilter === 'All' || u.role === roleFilter;
        let matchesStatus = true;
        if (statusFilter === 'Active') matchesStatus = u.isActive === true;
        if (statusFilter === 'Inactive') matchesStatus = u.isActive === false;
        return matchesSearch && matchesRole && matchesStatus;
    });

    // ── Edit Dialog ─────────────────────────────────────────────────────────
    const [editUserOpen, setEditUserOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);

    const handleEditClick = (u: any) => { setSelectedUser({ ...u }); setEditUserOpen(true); };
    const handleEditClose = () => { setEditUserOpen(false); setSelectedUser(null); };

    const handleEditSave = () => {
        const payload = {
            Fname: selectedUser.Fname,
            Lname: selectedUser.Lname,
            email: selectedUser.email,
            isActive: selectedUser.isActive,
            userId: selectedUser.userId,
            role: selectedUser.role,
        };
        updateUser.mutate(payload, {
            onSuccess: () => {
                setSnackbar({ open: true, message: 'User updated successfully.', severity: 'success' });
                setEditUserOpen(false);
            },
            onError: () => {
                setSnackbar({ open: true, message: 'Failed to update user. Please try again.', severity: 'error' });
            },
        });
    };

    // ── Delete Dialog ────────────────────────────────────────────────────────
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<any>(null);

    const handleDeleteClick = (u: any) => { setUserToDelete(u); setDeleteConfirmOpen(true); };
    const handleDeleteCancel = () => { setDeleteConfirmOpen(false); setUserToDelete(null); };

    const handleDeleteConfirm = () => {
        setDeleteConfirmOpen(false);
        deleteUser.mutate({ userId: userToDelete.userId, email: userToDelete.email }, {
            onSuccess: () => {
                setSnackbar({ open: true, message: `${userToDelete.Fname} ${userToDelete.Lname} deleted successfully.`, severity: 'success' });
                setUserToDelete(null);
            },
            onError: () => {
                setSnackbar({ open: true, message: 'Failed to delete user. Please try again.', severity: 'error' });
                setUserToDelete(null);
            },
        });
    };

    // ── Invite Dialog ────────────────────────────────────────────────────────
    const [inviteUserOpen, setInviteUserOpen] = useState(false);
    const [inviteData, setInviteData] = useState({ Fname: '', Lname: '', email: '', role: 'USER', password: '' });
    const [showPassword, setShowPassword] = useState(false);

    const handleInviteClick = () => {
        setInviteData({ Fname: '', Lname: '', email: '', role: 'USER', password: '' });
        setShowPassword(false);
        setInviteUserOpen(true);
    };

    const handleInviteSubmit = () => {
        createUser.mutate(inviteData, {
            onSuccess: () => {
                setInviteUserOpen(false);
                setSnackbar({ open: true, message: 'User invited successfully.', severity: 'success' });
            },
            onError: (err: any) => {
                const msg = err?.response?.status === 409
                    ? 'Email already exists.'
                    : 'Failed to create user. Please try again.';
                setSnackbar({ open: true, message: msg, severity: 'error' });
            },
        });
    };

    // ── Snackbar ─────────────────────────────────────────────────────────────
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false, message: '', severity: 'success',
    });

    return (
        <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-8 animate-fade-in">
            {/* Page Header */}
            <UserPageHeader onInviteClick={handleInviteClick} />

            {/* Table Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                {/* Search & Filters */}
                <UserSearchFilter
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    roleFilter={roleFilter}
                    roleAnchorEl={roleAnchorEl}
                    onRoleClick={handleRoleClick}
                    onRoleClose={handleRoleClose}
                    statusFilter={statusFilter}
                    statusAnchorEl={statusAnchorEl}
                    onStatusClick={handleStatusClick}
                    onStatusClose={handleStatusClose}
                />

                {/* Loading state */}
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <CircularProgress size={36} />
                    </div>
                ) : (
                    <UserTable
                        filteredUsers={filteredUsers}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        onPageChange={(_, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
                        onEditClick={handleEditClick}
                        onDeleteClick={handleDeleteClick}
                    />
                )}
            </div>

            {/* Edit User Dialog */}
            <EditUserDialog
                open={editUserOpen}
                selectedUser={selectedUser}
                onClose={handleEditClose}
                onSave={handleEditSave}
                onUserChange={setSelectedUser}
            />

            {/* Invite User Dialog */}
            <InviteUserDialog
                open={inviteUserOpen}
                inviteData={inviteData}
                showPassword={showPassword}
                onClose={() => setInviteUserOpen(false)}
                onSubmit={handleInviteSubmit}
                onInviteDataChange={setInviteData}
                onTogglePassword={() => setShowPassword((v) => !v)}
            />

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteConfirmOpen} onClose={handleDeleteCancel} maxWidth="xs" fullWidth>
                <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#e11d48', fontWeight: 700 }}>
                    <WarningAmberRounded sx={{ color: '#f43f5e' }} />
                    Confirm Deletion
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete{' '}
                        <strong>{userToDelete ? `${userToDelete.Fname} ${userToDelete.Lname}` : 'this user'}</strong>?
                        This action <strong>cannot be undone</strong>.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
                    <Button onClick={handleDeleteCancel} variant="outlined" sx={{ textTransform: 'none', borderColor: '#cbd5e1', color: '#475569', '&:hover': { background: '#f8fafc' } }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDeleteConfirm}
                        variant="contained"
                        disabled={deleteUser.isPending}
                        sx={{ textTransform: 'none', background: '#f43f5e', '&:hover': { background: '#e11d48' }, fontWeight: 700 }}
                    >
                        Yes, Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Result Snackbar */}
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
