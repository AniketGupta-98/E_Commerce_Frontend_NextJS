"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Drawer, List,
    ListItem, ListItemButton,
    ListItemText, Toolbar,
} from "@mui/material";
import { Dashboard, ShoppingCart, Inventory, People } from "@mui/icons-material";

const drawerWidth = 240;

const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: <Dashboard /> },
    { label: "Orders", href: "/orders", icon: <ShoppingCart /> },
    { label: "Products", href: "/products", icon: <Inventory /> },
    { label: "Users", href: "/users", icon: <People /> },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: "border-box",
                },
            }}
        >
            <Toolbar>
                <span className="text-xl font-bold">Admin</span>
            </Toolbar>

            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.href} disablePadding>
                        <ListItemButton
                            component={Link}
                            href={item.href}
                            selected={pathname === item.href}
                            className="flex gap-3"
                        >
                            {item.icon}
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}
