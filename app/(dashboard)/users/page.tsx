"use client";

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Search, FilterList, MoreVert, PersonAdd } from '@mui/icons-material';
import { IconButton, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import allUrl from "../../url.config.json"
import axios from "axios";
const url = allUrl.url
import { format } from 'date-fns';


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

    const user = useSelector((state) => state.user.user);
    const headerConfig = {
        headers: { Authorization: user.accessToken },
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
                            className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-indigo-500 sm:text-sm transition-all"
                            placeholder="Find user by name or email address..."
                        />
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <Button variant="outlined" startIcon={<FilterList fontSize="small" />} className="text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300 normal-case rounded-lg px-4 hidden sm:flex">
                            Role
                        </Button>
                        <Button variant="outlined" startIcon={<FilterList fontSize="small" />} className="text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300 normal-case rounded-lg px-4 hidden sm:flex">
                            Status
                        </Button>
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
                                ? usersData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : usersData
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
                                        <Button size="small" variant="text" className="text-indigo-600 font-semibold hover:bg-indigo-50 normal-case opacity-0 group-hover:opacity-100 transition-opacity mr-2">
                                            Manage
                                        </Button>
                                        <IconButton size="small" className="text-slate-400 hover:text-slate-600">
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
                    count={usersData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    className="border-t border-slate-200 bg-slate-50/50"
                />
            </div>
        </div>
    );
}
