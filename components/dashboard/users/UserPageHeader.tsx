import React from 'react';
import { PersonAdd } from '@mui/icons-material';
import { Button } from '@mui/material';

interface UserPageHeaderProps {
    onInviteClick: () => void;
}

export default function UserPageHeader({ onInviteClick }: UserPageHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-1 tracking-tight">System Users</h2>
                <p className="text-slate-500 text-sm">Manage customer accounts, roles, and staff permissions.</p>
            </div>
            <Button
                variant="contained"
                onClick={onInviteClick}
                startIcon={<PersonAdd fontSize="small" />}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 shadow-sm shadow-indigo-200 rounded-lg normal-case transition-all"
                disableElevation
            >
                Invite User
            </Button>
        </div>
    );
}
