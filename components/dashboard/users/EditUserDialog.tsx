import React from 'react';
import { Close } from '@mui/icons-material';
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
    Switch,
    FormControlLabel,
} from '@mui/material';

interface EditUserDialogProps {
    open: boolean;
    selectedUser: any;
    onClose: () => void;
    onSave: () => void;
    onUserChange: (updated: any) => void;
}

export default function EditUserDialog({
    open,
    selectedUser,
    onClose,
    onSave,
    onUserChange,
}: EditUserDialogProps) {
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
                    Edit User Settings
                </DialogTitle>
                <IconButton onClick={onClose} size="small" className="text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                    <Close fontSize="small" />
                </IconButton>
            </div>

            {/* Content */}
            <DialogContent className="px-6 py-6 border-none">
                {selectedUser && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <TextField
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            value={selectedUser.Fname || ''}
                            onChange={(e) => onUserChange({ ...selectedUser, Fname: e.target.value })}
                            size="medium"
                        />
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            value={selectedUser.Lname || ''}
                            onChange={(e) => onUserChange({ ...selectedUser, Lname: e.target.value })}
                            size="medium"
                        />
                        <TextField
                            label="Email Address"
                            variant="outlined"
                            fullWidth
                            className="sm:col-span-2 bg-slate-50"
                            value={selectedUser.email || ''}
                            size="medium"
                        />
                        <FormControl fullWidth size="medium">
                            <InputLabel>System Role</InputLabel>
                            <Select
                                value={selectedUser.role || 'USER'}
                                label="System Role"
                                onChange={(e) => onUserChange({ ...selectedUser, role: e.target.value })}
                            >
                                <MenuItem value="ADMIN">ADMIN</MenuItem>
                                <MenuItem value="USER">USER</MenuItem>
                            </Select>
                        </FormControl>
                        <div className="flex items-center sm:h-[56px]">
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={selectedUser.isActive || false}
                                        onChange={(e) => onUserChange({ ...selectedUser, isActive: e.target.checked })}
                                    />
                                }
                                label={
                                    <span className="text-sm font-semibold text-slate-700">
                                        {selectedUser.isActive ? 'Active Account' : 'Inactive Account'}
                                    </span>
                                }
                                className="m-0 px-4 py-2 w-full justify-between flex-row-reverse border border-slate-300 rounded-lg"
                            />
                        </div>
                    </div>
                )}
            </DialogContent>

            {/* Actions */}
            <DialogActions className="px-6 py-4 justify-between border-t border-slate-100">
                <Button onClick={onClose} className="text-slate-600 font-medium normal-case hover:bg-slate-50 px-4 py-2 rounded-lg">
                    Discard Changes
                </Button>
                <Button
                    onClick={onSave}
                    variant="contained"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium normal-case shadow-sm px-5 py-2 rounded-lg"
                    disableElevation
                >
                    Save Settings
                </Button>
            </DialogActions>
        </Dialog>
    );
}
