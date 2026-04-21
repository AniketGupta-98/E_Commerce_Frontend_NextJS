import React from 'react';
import { Search, FilterList } from '@mui/icons-material';
import { Button, Menu, MenuItem } from '@mui/material';

interface UserSearchFilterProps {
    searchQuery: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    roleFilter: string;
    roleAnchorEl: null | HTMLElement;
    onRoleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onRoleClose: (role?: string) => void;
    statusFilter: string;
    statusAnchorEl: null | HTMLElement;
    onStatusClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onStatusClose: (status?: string) => void;
}

export default function UserSearchFilter({
    searchQuery,
    onSearchChange,
    roleFilter,
    roleAnchorEl,
    onRoleClick,
    onRoleClose,
    statusFilter,
    statusAnchorEl,
    onStatusClick,
    onStatusClose,
}: UserSearchFilterProps) {
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
                    placeholder="Find user by name or email address..."
                />
            </div>

            {/* Filters */}
            <div className="flex gap-2 w-full sm:w-auto">
                {/* Role Filter */}
                <Button
                    onClick={onRoleClick}
                    variant="outlined"
                    startIcon={<FilterList fontSize="small" />}
                    className="text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300 normal-case rounded-lg px-4 hidden sm:flex"
                >
                    Role {roleFilter !== 'All' ? `: ${roleFilter}` : ''}
                </Button>
                <Menu anchorEl={roleAnchorEl} open={Boolean(roleAnchorEl)} onClose={() => onRoleClose()}>
                    <MenuItem onClick={() => onRoleClose('All')}>All Roles</MenuItem>
                    <MenuItem onClick={() => onRoleClose('Admin')}>Admin</MenuItem>
                    <MenuItem onClick={() => onRoleClose('Manager')}>Manager</MenuItem>
                    <MenuItem onClick={() => onRoleClose('User')}>User</MenuItem>
                </Menu>

                {/* Status Filter */}
                <Button
                    onClick={onStatusClick}
                    variant="outlined"
                    startIcon={<FilterList fontSize="small" />}
                    className="text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300 normal-case rounded-lg px-4 hidden sm:flex"
                >
                    Status {statusFilter !== 'All' ? `: ${statusFilter}` : ''}
                </Button>
                <Menu anchorEl={statusAnchorEl} open={Boolean(statusAnchorEl)} onClose={() => onStatusClose()}>
                    <MenuItem onClick={() => onStatusClose('All')}>All Status</MenuItem>
                    <MenuItem onClick={() => onStatusClose('Active')}>Active</MenuItem>
                    <MenuItem onClick={() => onStatusClose('Inactive')}>Inactive</MenuItem>
                </Menu>
            </div>
        </div>
    );
}
