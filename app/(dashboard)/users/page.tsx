"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import allUrl from '../../url.config.json';
import { useAppSelector } from '@/lib/useAppselector';

import UserPageHeader from '@/components/dashboard/users/UserPageHeader';
import UserSearchFilter from '@/components/dashboard/users/UserSearchFilter';
import UserTable from '@/components/dashboard/users/UserTable';
import EditUserDialog from '@/components/dashboard/users/EditUserDialog';
import InviteUserDialog from '@/components/dashboard/users/InviteUserDialog';

const url = allUrl.url;

export default function UsersPage() {
    const user = useAppSelector((state) => state.user.user);
    const headerConfig = { headers: { Authorization: user?.accessToken } };

    // ── Data ────────────────────────────────────────────────────────────────
    const [usersData, setUsersData] = useState<any[]>([]);

    useEffect(() => {
        userList();
    }, []);


    const userList = () => {
        try {
            axios
                .get(url + '/users', headerConfig)
                .then((res) => setUsersData(res.data.user))
                .catch((error) => console.log(error));
        } catch { /* silent */ }
    }

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
    const handleEditSave = () => { console.log('Saving user:', selectedUser); setEditUserOpen(false); };

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
        console.log('Inviting user:', inviteData);
        try {
            axios
                .post(url + '/admin/usercreate', inviteData, headerConfig)
                .then((res) => { setInviteUserOpen(false); userList(); })
                .catch((error) => console.log(error));
        } catch { /* silent */ }
    };

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

                {/* Users Table */}
                <UserTable
                    filteredUsers={filteredUsers}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={(_, newPage) => setPage(newPage)}
                    onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
                    onEditClick={handleEditClick}
                />
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
        </div>
    );
}
