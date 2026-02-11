"use client";

import { AppBar, Toolbar, IconButton, Avatar, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
export default function Header() {
    return (
        <AppBar
            position="static"
            elevation={1}
            color="inherit"
            className="border-b"
        >
            <Toolbar className="flex justify-between">
                <h1 className="text-lg font-semibold">Dashboard</h1>

                <div className="flex items-center gap-4">
                    <Avatar alt="Admin" />
                    <Button
                        variant="outlined"
                        startIcon={<LogoutIcon />}
                        size="small"
                    >
                        Logout
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
}
