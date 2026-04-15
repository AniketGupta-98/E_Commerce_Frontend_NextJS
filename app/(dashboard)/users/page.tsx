"use client";

import React, { useEffect, useState } from 'react';
import { Search, FilterList, MoreVert, PersonAdd } from '@mui/icons-material';
import { IconButton, Button } from '@mui/material';
import allUrl from "../../url.config.json"
import axios from "axios";
const url = allUrl.url

const usersData = [
    { id: 'USR-081', name: 'Alice Freeman', email: 'alice.freeman@example.com', role: 'Admin', registered: 'Jan 12, 2023', status: 'Active', color: 'bg-indigo-500' },
    { id: 'USR-082', name: 'Bob Smith', email: 'bob.smith@example.com', role: 'Customer', registered: 'Feb 24, 2023', status: 'Active', color: 'bg-emerald-500' },
    { id: 'USR-083', name: 'Charlie Davis', email: 'charlie.d@example.com', role: 'Customer', registered: 'Mar 05, 2023', status: 'Inactive', color: 'bg-sky-500' },
    { id: 'USR-084', name: 'Diana Prince', email: 'diana.p@example.com', role: 'Manager', registered: 'Apr 18, 2023', status: 'Active', color: 'bg-rose-500' },
    { id: 'USR-085', name: 'Evan Wright', email: 'evan.w@example.com', role: 'Customer', registered: 'May 02, 2023', status: 'Banned', color: 'bg-amber-500' },
];

const getRoleBadge = (role: string) => {
    switch (role) {
        case 'Admin': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
        case 'Manager': return 'bg-sky-50 text-sky-700 border-sky-200';
        default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
};

const getStatusBadge = (status: string) => {
    switch (status) {
        case 'Active': return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
        case 'Inactive': return 'bg-slate-100 text-slate-600 border border-slate-200';
        case 'Banned': return 'bg-rose-50 text-rose-700 border border-rose-200';
        default: return 'bg-slate-50 text-slate-700 border border-slate-200';
    }
};


export default function UsersPage() {


    // const [usersData, setusersData] = useState([]);

    useEffect(() => {
        try {
            axios
                .get(url + "/users",)
                .then((res) => {
                    console.log("res", res.data);
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

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                                <th className="p-4 pl-6">User Profile</th>
                                <th className="p-4">System Role</th>
                                <th className="p-4">Reg. Date</th>
                                <th className="p-4">Account Status</th>
                                <th className="p-4 text-right pr-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {usersData.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50/70 transition-colors group cursor-pointer">
                                    <td className="p-4 pl-6">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-11 h-11 rounded-full flex justify-center items-center text-white font-bold text-sm shadow-sm ring-2 ring-white ${user.color}`}>
                                                {user.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-slate-900 text-base">{user.name}</div>
                                                <div className="text-xs text-slate-500 font-medium">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2.5 py-1 rounded-full border text-xs font-semibold shadow-sm inline-block ${getRoleBadge(user.role)}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-4 text-slate-600 font-medium">{user.registered}</td>
                                    <td className="p-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center w-fit gap-1.5 ${getStatusBadge(user.status)}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : user.status === 'Banned' ? 'bg-rose-500' : 'bg-slate-400'}`}></span>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right pr-6">
                                        <Button size="small" variant="text" className="text-indigo-600 font-semibold hover:bg-indigo-50 normal-case opacity-0 group-hover:opacity-100 transition-opacity mr-2">
                                            Manage
                                        </Button>
                                        <IconButton size="small" className="text-slate-400 hover:text-slate-600">
                                            <MoreVert fontSize="small" />
                                        </IconButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500 bg-slate-50/50">
                    <div>Showing <span className="font-medium text-slate-700">1</span> to <span className="font-medium text-slate-700">5</span> of <span className="font-medium text-slate-700">892</span> users</div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 font-medium hover:bg-slate-50 disabled:opacity-50 transition-colors shadow-sm" disabled>Previous</button>
                        <button className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 font-medium hover:bg-slate-50 transition-colors shadow-sm">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
