"use client";

import { AppBar, Toolbar, IconButton, Avatar, Button, InputBase } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux';
import { currentUser, clearAccessToken } from '../lib/features/Auth/authSlice';

interface HeaderProps {
    onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        // document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        dispatch(clearAccessToken())
        localStorage.setItem("user", "")
        router.replace("/login");
    };

    return (
        <AppBar
            position="sticky"
            elevation={0}
            color="transparent"
            sx={{ backgroundColor: 'white' }}
            className="bg-white border-b border-slate-200 z-10"
        >
            <Toolbar className="flex justify-between items-center h-16 min-h-[64px] px-6 mui-toolbar-override">
                <div className="flex items-center">
                    <IconButton 
                        onClick={onMenuClick} 
                        edge="start" 
                        size="medium"
                        className="mr-3 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>

                {/* Search Bar - Amazon/Flipkart inspired */}
                <div className="flex bg-slate-100 rounded-lg overflow-hidden items-center px-4 py-2 max-w-md w-full border border-transparent focus-within:border-indigo-400 focus-within:bg-white focus-within:shadow-sm focus-within:ring-2 focus-within:ring-indigo-100 transition-all mr-6">
                    <SearchIcon fontSize="small" className="text-slate-400 mr-2" />
                    <InputBase
                        placeholder="Search products, orders, or users..."
                        className="w-full text-sm text-slate-700"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
                </div>

                <div className="flex items-center gap-5 ml-auto">
                    <IconButton size="small" className="text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
                        <NotificationsNoneIcon />
                    </IconButton>

                    <div className="w-px h-6 bg-slate-200 block"></div>

                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-semibold text-slate-800 leading-none mb-1">Store Admin</p>
                            <p className="text-xs text-slate-500 leading-none group-hover:text-indigo-600 transition-colors">Manage Account</p>
                        </div>
                        <Avatar alt="Admin" className="w-9 h-9 border-2 border-transparent group-hover:border-indigo-100 transition-all font-semibold bg-indigo-600 text-sm">A</Avatar>
                    </div>

                    <Button
                        variant="outlined"
                        startIcon={<LogoutIcon className="rotate-180" fontSize="small" />}
                        size="small"
                        onClick={handleLogout}
                        className="text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-red-600 hover:border-red-200 normal-case rounded-lg ml-2 transition-all font-medium py-1.5"
                    >
                        Sign Out
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
}
