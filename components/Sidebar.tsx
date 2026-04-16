"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Drawer, List,
    ListItem, ListItemButton,
    ListItemText, Toolbar,
} from "@mui/material";
import { Dashboard, ShoppingCart, Inventory, People, Storefront } from "@mui/icons-material";

const drawerWidth = 260;

const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: <Dashboard fontSize="small" /> },
    { label: "Orders", href: "/orders", icon: <ShoppingCart fontSize="small" /> },
    { label: "Products", href: "/products", icon: <Inventory fontSize="small" /> },
    { label: "Users", href: "/users", icon: <People fontSize="small" /> },
];

interface SidebarProps {
    open: boolean;
    onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
    const pathname = usePathname();

    return (
        <Drawer
            variant="persistent"
            open={open}
            onClose={onClose}
            sx={{
                width: open ? drawerWidth : 0,
                flexShrink: 0,
                transition: 'width 0.225s cubic-bezier(0.4, 0, 0.6, 1)',
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    borderRight: "1px solid #e2e8f0",
                    backgroundColor: "#ffffff",
                },
            }}
        >
            <Toolbar className="border-b border-slate-100 flex items-center gap-3 px-6 h-16 min-h-[64px] mui-toolbar-override">
                <div className="bg-indigo-600 text-white p-1.5 rounded-lg flex items-center justify-center shadow-sm">
                    <Storefront fontSize="small" />
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-blue-600 tracking-tight">AdminPortal</span>
            </Toolbar>

            <List className="px-3 pt-6 flex flex-col gap-1.5">
                {menuItems.map((item) => {
                    const active = pathname === item.href;
                    return (
                        <ListItem key={item.href} disablePadding>
                            <ListItemButton
                                component={Link}
                                href={item.href}
                                className={`rounded-xl py-2.5 px-4 transition-all duration-200 ${
                                    active 
                                    ? "bg-indigo-50 text-indigo-700 font-semibold" 
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                                sx={{
                                    "&.Mui-focusVisible": { backgroundColor: "transparent" },
                                    "&.MuiListItemButton-root:hover": { backgroundColor: active ? "#eef2ff" : "#f8fafc" }
                                }}
                            >
                                <div className={`flex items-center justify-center mr-3 ${active ? "text-indigo-600" : "text-slate-400"}`}>
                                    {item.icon}
                                </div>
                                <ListItemText 
                                    primary={item.label} 
                                    className="m-0"
                                    primaryTypographyProps={{ 
                                        className: `text-sm ${active ? "font-semibold" : "font-medium"} whitespace-nowrap` 
                                    }} 
                                />
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>
        </Drawer>
    );
}
