"use client";

import React, { useEffect, useState } from 'react';
import { Search, FilterList, MoreVert, PersonAdd, Close, Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel, Switch, FormControlLabel, Menu, InputAdornment } from '@mui/material';
import allUrl from "../../url.config.json"
import axios from "axios";
const url = allUrl.url
import { format } from 'date-fns';
import { useAppSelector } from "@/lib/useAppselector";


const getRoleBadge = (role: string) => {
    switch (role) {
        case 'Admin': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
        case 'Manager': return 'bg-sky-50 text-sky-700 border-sky-200';
        default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
};

const getStatusBadge = (status: boolean) => {
    switch (status) {
        case status == true: return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
        case status == false: return 'bg-slate-100 text-slate-600 border border-slate-200';
        default: return 'bg-slate-50 text-slate-700 border border-slate-200';
    }
};

const color = ["bg-amber-500", "bg-rose-500", "bg-emerald-500", "bg-sky-500", "bg-indigo-500", "bg-slate-500"]

export default function UsersPage() {

    const user = useAppSelector((state) => state.user.user);

    const headerConfig = {
        headers: { Authorization: user?.accessToken },
    };

    const [usersData, setusersData] = useState([{
        Fname: "",
        Lname: "",
        email: "",
        isActive: false,
        role: "",
        createdAt: "",
    }]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');

    const [roleAnchorEl, setRoleAnchorEl] = useState<null | HTMLElement>(null);
    const [statusAnchorEl, setStatusAnchorEl] = useState<null | HTMLElement>(null);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setPage(0);
    };

    const handleRoleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setRoleAnchorEl(event.currentTarget);
    };

    const handleRoleClose = (role?: string) => {
        if (typeof role === 'string') setRoleFilter(role);
        setRoleAnchorEl(null);
        setPage(0);
    };

    const handleStatusClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setStatusAnchorEl(event.currentTarget);
    };

    const handleStatusClose = (status?: string) => {
        if (typeof status === 'string') setStatusFilter(status);
        setStatusAnchorEl(null);
        setPage(0);
    };

    const filteredUsers = usersData.filter(user => {
        const fullName = `${user.Fname || ''} ${user.Lname || ''}`.trim().toLowerCase();
        const email = (user.email || '').toLowerCase();
        const search = searchQuery.toLowerCase();

        const matchesSearch = fullName.includes(search) || email.includes(search);
        const matchesRole = roleFilter === 'All' || user.role === roleFilter;

        let matchesStatus = true;
        if (statusFilter === 'Active') matchesStatus = user.isActive === true;
        if (statusFilter === 'Inactive') matchesStatus = user.isActive === false;

        return matchesSearch && matchesRole && matchesStatus;
    });

    const [editUserOpen, setEditUserOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);

    const [inviteUserOpen, setInviteUserOpen] = useState(false);
    const [inviteData, setInviteData] = useState({ Fname: '', Lname: '', email: '', role: 'USER', password: '' });
    const [showPassword, setShowPassword] = useState(false);

    const handleInviteClick = () => {
        setInviteData({ Fname: '', Lname: '', email: '', role: 'USER', password: '' });
        setShowPassword(false);
        setInviteUserOpen(true);
    };

    const handleInviteClose = () => {
        setInviteUserOpen(false);
    };

    const handleInviteSubmit = () => {
        // Invite submit logic
        console.log("Inviting user:", inviteData);
        try {
            const body = {
                Fname: inviteData.Fname,
                Lname: inviteData.Lname,
                email: inviteData.email,
                role: inviteData.role,
                password: inviteData.password,
            }

            axios
                .post(url + "/admin/usercreate", body, headerConfig)
                .then((res) => {
                    setusersData(res.data.user)
                })
                .catch((error) => {
                    console.log(error);
                });

            // setInviteUserOpen(false);
        } catch (error) {

        }
    };

    const handleEditClick = (user: any) => {
        setSelectedUser({ ...user });
        setEditUserOpen(true);
    };

    const handleEditClose = () => {
        setEditUserOpen(false);
        setSelectedUser(null);
    };

    const handleEditSave = () => {
        console.log("Saving user:", selectedUser);
        setEditUserOpen(false);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        try {
            axios
                .get(url + "/users", headerConfig)
                .then((res) => {
                    setusersData(res.data.user)
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch {
            // setError("Login failed. Please try again.");
        } finally {
            // setLoading(false);
        }
    }, [])


    return (
        <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-1 tracking-tight">System Users</h2>
                    <p className="text-slate-500 text-sm">Manage customer accounts, roles, and staff permissions.</p>
                </div>
                <Button
                    variant="contained"
                    onClick={handleInviteClick}
                    startIcon={<PersonAdd fontSize="small" />}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 shadow-sm shadow-indigo-200 rounded-lg normal-case transition-all"
                    disableElevation
                >
                    Invite User
                </Button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white">
                    <div className="relative w-full sm:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <Search fontSize="small" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-indigo-500 sm:text-sm transition-all"
                            placeholder="Find user by name or email address..."
                        />
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <Button onClick={handleRoleClick} variant="outlined" startIcon={<FilterList fontSize="small" />} className="text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300 normal-case rounded-lg px-4 hidden sm:flex">
                            Role {roleFilter !== 'All' ? `: ${roleFilter}` : ''}
                        </Button>
                        <Menu anchorEl={roleAnchorEl} open={Boolean(roleAnchorEl)} onClose={() => handleRoleClose()}>
                            <MenuItem onClick={() => handleRoleClose('All')}>All Roles</MenuItem>
                            <MenuItem onClick={() => handleRoleClose('Admin')}>Admin</MenuItem>
                            <MenuItem onClick={() => handleRoleClose('Manager')}>Manager</MenuItem>
                            <MenuItem onClick={() => handleRoleClose('User')}>User</MenuItem>
                        </Menu>

                        <Button onClick={handleStatusClick} variant="outlined" startIcon={<FilterList fontSize="small" />} className="text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300 normal-case rounded-lg px-4 hidden sm:flex">
                            Status {statusFilter !== 'All' ? `: ${statusFilter}` : ''}
                        </Button>
                        <Menu anchorEl={statusAnchorEl} open={Boolean(statusAnchorEl)} onClose={() => handleStatusClose()}>
                            <MenuItem onClick={() => handleStatusClose('All')}>All Status</MenuItem>
                            <MenuItem onClick={() => handleStatusClose('Active')}>Active</MenuItem>
                            <MenuItem onClick={() => handleStatusClose('Inactive')}>Inactive</MenuItem>
                        </Menu>
                    </div>
                </div>

                <TableContainer className="overflow-x-auto">
                    <Table className="w-full text-left border-collapse min-w-[800px]">
                        <TableHead>
                            <TableRow className="bg-slate-50/50 border-b border-slate-200">
                                <TableCell className="p-4 pl-6 text-xs uppercase tracking-wider text-slate-500 font-semibold border-b-0">User Profile</TableCell>
                                <TableCell className="p-4 text-xs uppercase tracking-wider text-slate-500 font-semibold border-b-0">System Role</TableCell>
                                <TableCell className="p-4 text-xs uppercase tracking-wider text-slate-500 font-semibold border-b-0">Reg. Date</TableCell>
                                <TableCell className="p-4 text-xs uppercase tracking-wider text-slate-500 font-semibold border-b-0">Account Status</TableCell>
                                <TableCell className="p-4 text-right pr-6 text-xs uppercase tracking-wider text-slate-500 font-semibold border-b-0">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="divide-y divide-slate-100 text-sm">
                            {(rowsPerPage > 0
                                ? filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : filteredUsers
                            ).map((user, id) => (
                                <TableRow key={id} className="hover:bg-slate-50/70 transition-colors group cursor-pointer border-b-0">
                                    <TableCell className="p-4 pl-6 border-b-0">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-11 h-11 rounded-full flex justify-center items-center text-white font-bold text-sm shadow-sm ring-2 ring-white ${color[id % color.length]}`}>
                                                {user.Fname && user.Lname ? user.Fname[0] + user.Lname[0] : ""}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-slate-900 text-base">{user.Fname && user.Lname ? user.Fname + " " + user.Lname : ""}</div>
                                                <div className="text-xs text-slate-500 font-medium">{user.email}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="p-4 border-b-0">
                                        {user.role && (
                                            <span className={`px-2.5 py-1 rounded-full border text-xs font-semibold shadow-sm inline-block ${getRoleBadge(user.role)}`}>
                                                {user.role}
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell className="p-4 text-slate-600 font-medium border-b-0">{user?.createdAt
                                        ? format(new Date(user.createdAt), 'dd MMM yyyy, hh:mm a')
                                        : '—'}
                                    </TableCell>
                                    <TableCell className="p-4 border-b-0">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center w-fit gap-1.5 ${getStatusBadge(user.isActive)}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${user.isActive === true ? 'bg-emerald-500' : user.isActive === false ? 'bg-rose-500' : 'bg-slate-400'}`}></span>
                                            {user.isActive ? "Active" : "Inactive"}
                                        </span>
                                    </TableCell>
                                    <TableCell className="p-4 text-right pr-6 border-b-0">
                                        <Button size="small" variant="text" onClick={(e) => { e.stopPropagation(); handleEditClick(user); }} className="text-indigo-600 font-semibold hover:bg-indigo-50 normal-case opacity-0 group-hover:opacity-100 transition-opacity mr-2">
                                            Manage
                                        </Button>
                                        <IconButton onClick={(e) => { e.stopPropagation(); handleEditClick(user); }} size="small" className="text-slate-400 hover:text-slate-600">
                                            <MoreVert fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    component="div"
                    count={filteredUsers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    className="border-t border-slate-200 bg-slate-50/50"
                />
            </div>

            {/* Edit User Dialog */}
            <Dialog open={editUserOpen} onClose={handleEditClose} maxWidth="sm" fullWidth PaperProps={{ className: "rounded-2xl shadow-xl border border-slate-100 p-2" }}>
                <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
                    <DialogTitle className="p-0 text-xl font-bold text-slate-800 tracking-tight">Edit User Settings</DialogTitle>
                    <IconButton onClick={handleEditClose} size="small" className="text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                        <Close fontSize="small" />
                    </IconButton>
                </div>

                <DialogContent className="px-6 py-6 border-none">
                    {selectedUser && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <TextField
                                label="First Name"
                                variant="outlined"
                                fullWidth
                                value={selectedUser.Fname || ''}
                                onChange={(e) => setSelectedUser({ ...selectedUser, Fname: e.target.value })}
                                size="medium"
                            />
                            <TextField
                                label="Last Name"
                                variant="outlined"
                                fullWidth
                                value={selectedUser.Lname || ''}
                                onChange={(e) => setSelectedUser({ ...selectedUser, Lname: e.target.value })}
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
                                    onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                                >
                                    <MenuItem value="ADMIN">ADMIN</MenuItem>
                                    <MenuItem value="USER">USER</MenuItem>
                                </Select>
                            </FormControl>
                            <div className="flex items-center sm:h-[56px]">
                                <FormControlLabel
                                    control={<Switch checked={selectedUser.isActive || false} onChange={(e) => setSelectedUser({ ...selectedUser, isActive: e.target.checked })} />}
                                    label={<span className="text-sm font-semibold text-slate-700">{selectedUser.isActive ? "Active Account" : "Inactive Account"}</span>}
                                    className="m-0 px-4 py-2 w-full justify-between flex-row-reverse border border-slate-300 rounded-lg"
                                />
                            </div>
                        </div>
                    )}
                </DialogContent>

                <DialogActions className="px-6 py-4 justify-between border-t border-slate-100">
                    <Button onClick={handleEditClose} className="text-slate-600 font-medium normal-case hover:bg-slate-50 px-4 py-2 rounded-lg">
                        Discard Changes
                    </Button>
                    <Button onClick={handleEditSave} variant="contained" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium normal-case shadow-sm px-5 py-2 rounded-lg" disableElevation>
                        Save Settings
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Invite User Dialog */}
            <Dialog open={inviteUserOpen} onClose={handleInviteClose} maxWidth="sm" fullWidth PaperProps={{ className: "rounded-2xl shadow-xl border border-slate-100 p-2" }}>
                <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
                    <DialogTitle className="p-0 text-xl font-bold text-slate-800 tracking-tight">Invite New User</DialogTitle>
                    <IconButton onClick={handleInviteClose} size="small" className="text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                        <Close fontSize="small" />
                    </IconButton>
                </div>

                <DialogContent className="px-6 py-6 border-none">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <TextField
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            value={inviteData.Fname}
                            onChange={(e) => setInviteData({ ...inviteData, Fname: e.target.value })}
                            size="medium"
                        />
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            value={inviteData.Lname}
                            onChange={(e) => setInviteData({ ...inviteData, Lname: e.target.value })}
                            size="medium"
                        />
                        <TextField
                            label="Email Address"
                            type="email"
                            variant="outlined"
                            fullWidth
                            className="sm:col-span-2"
                            value={inviteData.email}
                            onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                            size="medium"
                        />
                        <TextField
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            fullWidth
                            className="sm:col-span-2"
                            value={inviteData.password}
                            onChange={(e) => setInviteData({ ...inviteData, password: e.target.value })}
                            size="medium"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
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
                                onChange={(e) => setInviteData({ ...inviteData, role: e.target.value })}
                            >
                                <MenuItem value="ADMIN">Admin</MenuItem>
                                <MenuItem value="USER">User</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </DialogContent>

                <DialogActions className="px-6 py-4 justify-between border-t border-slate-100">
                    <Button onClick={handleInviteClose} className="text-slate-600 font-medium normal-case hover:bg-slate-50 px-4 py-2 rounded-lg">
                        Cancel
                    </Button>
                    <Button onClick={handleInviteSubmit} variant="contained" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium normal-case shadow-sm px-5 py-2 rounded-lg" disableElevation>
                        Add User
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}
