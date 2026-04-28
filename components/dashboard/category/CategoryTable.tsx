import React from 'react';
import { EditOutlined, DeleteOutline, CategoryOutlined } from '@mui/icons-material';
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

interface CategoryTableProps {
    filteredCategories: any[];
    page: number;
    rowsPerPage: number;
    onPageChange: (event: unknown, newPage: number) => void;
    onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onEditClick: (category: any) => void;
    onDeleteClick: (category: any) => void;
}

const categoryIconColors = [
    'bg-indigo-500',
    'bg-violet-500',
    'bg-sky-500',
    'bg-emerald-500',
    'bg-amber-500',
    'bg-rose-500',
    'bg-teal-500',
    'bg-orange-500',
];

export default function CategoryTable({
    filteredCategories,
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
    onEditClick,
    onDeleteClick,
}: CategoryTableProps) {
    const visibleRows = rowsPerPage > 0
        ? filteredCategories?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : filteredCategories;

    console.log("visibleRows", visibleRows);

    return (
        <>
            <TableContainer className="overflow-x-auto">
                <Table className="w-full text-left border-collapse min-w-[700px]">
                    <TableHead>
                        <TableRow className="bg-slate-50/50 border-b border-slate-200">
                            <TableCell className="p-4 pl-6 text-xs uppercase tracking-wider text-slate-500 font-semibold border-b-0">
                                Category
                            </TableCell>
                            <TableCell className="p-4 text-xs uppercase tracking-wider text-slate-500 font-semibold border-b-0">
                                Description
                            </TableCell>
                            <TableCell className="p-4 text-xs uppercase tracking-wider text-slate-500 font-semibold border-b-0">
                                Created At
                            </TableCell>
                            <TableCell className="p-4 text-center text-xs uppercase tracking-wider text-slate-500 font-semibold border-b-0">
                                Edit
                            </TableCell>
                            <TableCell className="p-4 text-center pr-6 text-xs uppercase tracking-wider text-slate-500 font-semibold border-b-0">
                                Delete
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody className="divide-y divide-slate-100 text-sm">
                        {visibleRows?.length > 0 ? (
                            visibleRows.map((cat: any, idx: number) => (
                                <TableRow
                                    key={cat.name ?? idx}
                                    className="hover:bg-slate-50/70 transition-colors group cursor-pointer border-b-0"
                                >
                                    {/* Category name + icon */}
                                    <TableCell className="p-4 pl-6 border-b-0">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm ${categoryIconColors[idx % categoryIconColors.length]}`}
                                            >
                                                <CategoryOutlined fontSize="small" />
                                            </div>
                                            <span className="font-semibold text-slate-900 text-base">
                                                {cat.name || '—'}
                                            </span>
                                        </div>
                                    </TableCell>

                                    {/* Description */}
                                    <TableCell className="p-4 border-b-0 text-slate-500 max-w-xs">
                                        <span className="line-clamp-2">
                                            {cat.description || <span className="italic text-slate-300">No description</span>}
                                        </span>
                                    </TableCell>

                                    {/* Created At */}
                                    <TableCell className="p-4 text-slate-600 font-medium border-b-0">
                                        {cat.createdAt
                                            ? format(new Date(cat.createdAt), 'dd MMM yyyy, hh:mm a')
                                            : '—'}
                                    </TableCell>

                                    {/* Edit */}
                                    <TableCell className="p-4 text-center border-b-0">
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            startIcon={<EditOutlined fontSize="small" />}
                                            onClick={(e) => { e.stopPropagation(); onEditClick(cat); }}
                                            sx={{
                                                borderColor: '#6366f1',
                                                color: '#6366f1',
                                                textTransform: 'none',
                                                fontWeight: 600,
                                                fontSize: '0.75rem',
                                                '&:hover': { background: '#eef2ff', borderColor: '#4f46e5' },
                                            }}
                                        >
                                            Edit
                                        </Button>
                                    </TableCell>

                                    {/* Delete */}
                                    <TableCell className="p-4 text-center pr-6 border-b-0">
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            startIcon={<DeleteOutline fontSize="small" />}
                                            onClick={(e) => { e.stopPropagation(); onDeleteClick(cat); }}
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
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-16 text-slate-400 border-b-0">
                                    <CategoryOutlined sx={{ fontSize: 40, mb: 1, opacity: 0.3 }} />
                                    <p className="text-sm mt-2">No categories found</p>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredCategories?.length || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                className="border-t border-slate-200 bg-slate-50/50"
            />
        </>
    );
}
