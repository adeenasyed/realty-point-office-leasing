import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';

function Header() {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" sx={{ height: 84, borderRadius: 0, bgcolor: "#231F20" }}>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Link to="/" style={{ marginTop: 4, marginLeft: 16 }}>
                <img
                    src="/logo/logo.png"
                    style={{ width: 280, height: 70, minWidth: 280, minHeight: 70 }}
                />
            </Link>
            <Button disableRipple sx={{ marginTop: "20px", bgcolor: "transparent", "&:hover": { bgcolor: "transparent" }}} onClick={(event) => handleMenuOpen(event)}>
                <MenuIcon sx={{ color: "white", fontSize: "35px" }}/>
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{ style: { width: "175px" } }}
            >
                <MenuItem onClick={handleMenuClose} component={Link} to="/">
                    Home
                </MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} to="/units">
                    Units
                </MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} to="/amenities">
                    Amenities
                </MenuItem>
            </Menu>
        </Toolbar>
        </AppBar>
    );
}

export default Header;