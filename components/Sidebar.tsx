"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Drawer, List,
    ListItem, ListItemButton,
    ListItemText, Toolbar,
} from "@mui/material";
import { Dashboard, ShoppingCart, Inventory, People, Storefront, AddBox } from "@mui/icons-material";
import { primaryColor, neutralColor, surface, sidebar } from "@/lib/theme";

const drawerWidth = sidebar.width;

const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: <Dashboard fontSize="small" /> },
    { label: "Orders", href: "/orders", icon: <ShoppingCart fontSize="small" /> },
    { label: "Products", href: "/products", icon: <Inventory fontSize="small" /> },
    { label: "Add Product", href: "/products/add", icon: <AddBox fontSize="small" /> },
    { label: "Category", href: "/category", icon: <AddBox fontSize="small" /> },

    
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
                    borderRight: `1px solid ${neutralColor[200]}`,
                    backgroundColor: surface.sidebarBg,
                },
            }}
        >
            <Toolbar className="border-b border-slate-100 flex items-center gap-3 px-6 h-16 min-h-[64px] mui-toolbar-override">
                <div className="text-white p-1.5 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: primaryColor[600] }}>
                    <Storefront fontSize="small" />
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent tracking-tight" style={{ backgroundImage: `linear-gradient(to right, ${primaryColor[700]}, #2563eb)` }}>AdminPortal</span>
            </Toolbar>

            <List className="px-3 pt-6 flex flex-col gap-1.5">
                {menuItems.map((item) => {
                    const active = pathname === item.href;
                    return (
                        <ListItem key={item.href} disablePadding>
                            <ListItemButton
                                component={Link}
                                href={item.href}
                                className="rounded-xl py-2.5 px-4 transition-all duration-200"
                                sx={{
                                    color:           active ? primaryColor[700] : neutralColor[600],
                                    fontWeight:      active ? 600 : 500,
                                    backgroundColor: active ? primaryColor[50]  : 'transparent',
                                    "&.Mui-focusVisible": { backgroundColor: "transparent" },
                                    "&:hover": { backgroundColor: active ? primaryColor[50] : neutralColor[50], color: active ? primaryColor[700] : neutralColor[900] },
                                }}
                            >
                                <div className="flex items-center justify-center mr-3" style={{ color: active ? primaryColor[600] : neutralColor[400] }}>
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
