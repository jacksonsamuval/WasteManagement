import React, { useState } from 'react';
import { AppBar, Toolbar, Box, Button, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
    const [openDrawer, setOpenDrawer] = useState(false);

    const handleDrawerToggle = () => {
        setOpenDrawer(!openDrawer);
    };

    const handleScroll = (section) => {
        const element = document.getElementById(section);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <AppBar position="sticky" sx={{ background: "#2E7D32" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {/* Logo on the left */}
                <img src="/images/logo-white.png" alt="Track Trash Logo" style={{ height: 40, width: "auto" }} />

                {/* Centered navigation buttons (for desktop) */}
                <Box sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: "right", flexGrow: 1 }}>
                    <Button color="inherit" onClick={() => handleScroll("hero")}>Home</Button>
                    <Button color="inherit" onClick={() => handleScroll("about")}>About</Button>
                    <Button color="inherit" onClick={() => handleScroll("services")}>Services</Button>
                    <Button color="inherit" onClick={() => handleScroll("contact")}>Contact</Button>
                    <Button color="inherit" onClick={() => alert("Login clicked")}>Login</Button>
                </Box>

                {/* Box to align the Hamburger Menu and Login button on mobile */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {/* Hamburger icon (visible only on mobile) */}
                    <IconButton sx={{ display: { xs: 'block', sm: 'none' } }} color="inherit" onClick={handleDrawerToggle}>
                        <MenuIcon />
                    </IconButton>

                    {/* Login button on the right */}

                </Box>
            </Toolbar>

            {/* Drawer for mobile navigation */}
            <Drawer anchor="top" open={openDrawer} onClose={handleDrawerToggle}>
                <List sx={{ width: 250 }}>
                    <ListItem button onClick={() => { handleScroll("hero"); handleDrawerToggle(); }}>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button onClick={() => { handleScroll("about"); handleDrawerToggle(); }}>
                        <ListItemText primary="About" />
                    </ListItem>
                    <ListItem button onClick={() => { handleScroll("services"); handleDrawerToggle(); }}>
                        <ListItemText primary="Services" />
                    </ListItem>
                    <ListItem button onClick={() => { handleScroll("contact"); handleDrawerToggle(); }}>
                        <ListItemText primary="Contact" />
                    </ListItem>
                    <ListItem button onClick={() => { alert("Login clicked"); handleDrawerToggle(); }}>
                        <ListItemText primary="Login" />
                    </ListItem>
                </List>
            </Drawer>
        </AppBar>
    );
};

export default Navbar;
