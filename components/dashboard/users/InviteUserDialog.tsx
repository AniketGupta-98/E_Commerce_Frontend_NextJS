import React from 'react';
import { Close, Visibility, VisibilityOff } from '@mui/icons-material';
import {
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    InputAdornment,
} from '@mui/material';

interface InviteData {
    Fname: string;
    Lname: string;
    email: string;
    role: string;
    password: string;
}

interface InviteUserDialogProps {
    open: boolean;
    inviteData: InviteData;
    showPassword: boolean;
    onClose: () => void;
    onSubmit: () => void;
    onInviteDataChange: (updated: InviteData) => void;
    onTogglePassword: () => void;
}

export default function InviteUserDialog({
    open,
    inviteData,
    showPassword,
    onClose,
    onSubmit,
    onInviteDataChange,
    onTogglePassword,
}: InviteUserDialogProps) {
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
                <DialogTitle className="p-0 text-xl font-bold text-slate-800 tracking-tight">
                    Invite New User
                </DialogTitle>
                <IconButton onClick={onClose} size="small" className="text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                    <Close fontSize="small" />
                </IconButton>
            </div>

            {/* Content */}
            <DialogContent className="px-6 py-6 border-none">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <TextField
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        value={inviteData.Fname}
                        onChange={(e) => onInviteDataChange({ ...inviteData, Fname: e.target.value })}
                        size="medium"
                    />
                    <TextField
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        value={inviteData.Lname}
                        onChange={(e) => onInviteDataChange({ ...inviteData, Lname: e.target.value })}
                        size="medium"
                    />
                    <TextField
                        label="Email Address"
                        type="email"
                        variant="outlined"
                        fullWidth
                        className="sm:col-span-2"
                        value={inviteData.email}
                        onChange={(e) => onInviteDataChange({ ...inviteData, email: e.target.value })}
                        size="medium"
                    />
                    <TextField
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        className="sm:col-span-2"
                        value={inviteData.password}
                        onChange={(e) => onInviteDataChange({ ...inviteData, password: e.target.value })}
                        size="medium"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={onTogglePassword} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <FormControl fullWidth size="medium" className="sm:col-span-2">
                        <InputLabel>System Role</InputLabel>
                        <Select
                            value={inviteData.role}
                            label="System Role"
                            onChange={(e) => onInviteDataChange({ ...inviteData, role: e.target.value })}
                        >
                            <MenuItem value="ADMIN">Admin</MenuItem>
                            <MenuItem value="USER">User</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </DialogContent>

            {/* Actions */}
            <DialogActions className="px-6 py-4 justify-between border-t border-slate-100">
                <Button onClick={onClose} className="text-slate-600 font-medium normal-case hover:bg-slate-50 px-4 py-2 rounded-lg">
                    Cancel
                </Button>
                <Button
                    onClick={onSubmit}
                    variant="contained"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium normal-case shadow-sm px-5 py-2 rounded-lg"
                    disableElevation
                >
                    Add User
                </Button>
            </DialogActions>
        </Dialog>
    );
}
