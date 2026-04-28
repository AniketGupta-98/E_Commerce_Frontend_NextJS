import React from 'react';
import { EditOutlined, DeleteOutline } from '@mui/icons-material';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
} from '@mui/material';
import { format } from 'date-fns';
import { getRoleBadge, getStatusBadge, avatarColors } from './userUtils';

interface UserTableProps {
    filteredUsers: any[];
    page: number;
    rowsPerPage: number;
    onPageChange: (event: unknown, newPage: number) => void;
    onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onEditClick: (user: any) => void;
    onDeleteClick: (user: any) => void;
}

export default function UserTable({
    filteredUsers,
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
    onEditClick,
    onDeleteClick,
}: UserTableProps) {
    const visibleRows = rowsPerPage > 0
        ? filteredUsers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : filteredUsers;

    return (
        <>
            <TableContainer className="overflow-x-auto">
                <Table className="w-full text-left border-collapse min-w-[800px]">
                    <TableHead>
                        <TableRow className="bg-slate-50/50 border-b border-slate-200">
                            <TableCell className="p-4 pl-6 text-xs uppercase tracking-wider text-slate-500 font-semibold border-b-0">User Profile</TableCell>
                            <TableCell className="p-4 text-xs uppercase tracking-wider text-slate-500 font-semibold border-b-0">System Role</TableCell>
                            <TableCell className="p-4 text-xs uppercase tracking-wider text-slate-500 font-semibold border-b-0">Reg. Date</TableCell>
                            <TableCell className="p-4 text-xs uppercase tracking-wider text-slate-500 font-semibold border-b-0">Account Status</TableCell>
                            <TableCell className="p-4 text-center text-xs uppercase tracking-wider text-slate-500 font-semibold border-b-0">Edit</TableCell>
                            <TableCell className="p-4 text-center pr-6 text-xs uppercase tracking-wider text-slate-500 font-semibold border-b-0">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="divide-y divide-slate-100 text-sm">
                        {visibleRows?.map((user, id) => (
                            <TableRow key={id} className="hover:bg-slate-50/70 transition-colors group cursor-pointer border-b-0">
                                {/* User Profile */}
                                <TableCell className="p-4 pl-6 border-b-0">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-11 h-11 rounded-full flex justify-center items-center text-white font-bold text-sm shadow-sm ring-2 ring-white ${avatarColors[id % avatarColors.length]}`}>
                                            {user.Fname && user.Lname ? user.Fname[0] + user.Lname[0] : ''}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-900 text-base">
                                                {user.Fname && user.Lname ? `${user.Fname} ${user.Lname}` : ''}
                                            </div>
                                            <div className="text-xs text-slate-500 font-medium">{user.email}</div>
                                        </div>
                                    </div>
                                </TableCell>

                                {/* Role */}
                                <TableCell className="p-4 border-b-0">
                                    {user?.role && (
                                        <span className={`px-2.5 py-1 rounded-full border text-xs font-semibold shadow-sm inline-block ${getRoleBadge(user?.role)}`}>
                                            {user?.role}
                                        </span>
                                    )}
                                </TableCell>

                                {/* Registration Date */}
                                <TableCell className="p-4 text-slate-600 font-medium border-b-0">
                                    {user?.createdAt
                                        ? format(new Date(user.createdAt), 'dd MMM yyyy, hh:mm a')
                                        : '—'}
                                </TableCell>

                                {/* Status */}
                                <TableCell className="p-4 border-b-0">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center w-fit gap-1.5 ${getStatusBadge(user.isActive)}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${user.isActive === true ? 'bg-emerald-500' : user.isActive === false ? 'bg-rose-500' : 'bg-slate-400'}`} />
                                        {user.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </TableCell>

                                {/* Edit Column */}
                                <TableCell className="p-4 text-center border-b-0">
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        startIcon={<EditOutlined fontSize="small" />}
                                        onClick={(e) => { e.stopPropagation(); onEditClick(user); }}
                                        sx={{
                                            borderColor: '#6366f1',
                                            color: '#6366f1',
                                            textTransform: 'none',
                                            fontWeight: 600,
                                            fontSize: '0.75rem',
                                            '&:hover': { background: '#eef2ff', borderColor: '#4f46e5' },
                                        }}
                                    >
                                        Manage
                                    </Button>
                                </TableCell>

                                {/* Delete Column */}
                                <TableCell className="p-4 text-center pr-6 border-b-0">
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        startIcon={<DeleteOutline fontSize="small" />}
                                        onClick={(e) => { e.stopPropagation(); onDeleteClick(user); }}
                                        sx={{
                                            borderColor: '#f43f5e',
                                            color: '#f43f5e',
                                            textTransform: 'none',
                                            fontWeight: 600,
                                            fontSize: '0.75rem',
                                            '&:hover': { background: '#fff1f2', borderColor: '#e11d48' },
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={filteredUsers?.length || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                className="border-t border-slate-200 bg-slate-50/50"
            />
        </>
    );
}
