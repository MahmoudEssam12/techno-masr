import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { updateUserState } from "./../../store/slices/auth";
const drawerWidth = 240;
const navItems = ['Home', 'Categories', 'Cart', "login", "register"];
const authNavItems = ['Home', 'Categories', 'Cart', "logout"]

function Navbar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const auth = useSelector((state) => state.auth.userState); // user auth state
    const dispatch = useDispatch();
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const logout = () => {
        let user = JSON.parse(localStorage.getItem("credentials"));
        let loggedOutUser = JSON.stringify({ ...user, isLoggedIn: false })
        localStorage.setItem("credentials", loggedOutUser)
        dispatch(updateUserState())
    }

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Techno Masr
            </Typography>
            <Divider />
            <List>
                {auth ? (
                    authNavItems.map((item, index) => (
                        <ListItem key={item} disablePadding>
                            {item === "logout" ? (
                                <ListItemButton key={item} sx={{ textAlign: 'center' }} onClick={logout}>
                                    <ListItemText primary={item} />
                                </ListItemButton>
                            ) : (
                                <Link to={index === 0 ? "/" : `/${item}`}>
                                    <ListItemButton sx={{ textAlign: 'center' }}>
                                        <ListItemText primary={item} />
                                    </ListItemButton>
                                </Link>
                            )}

                        </ListItem>
                    ))
                ) : (
                    navItems.map((item, index) => (
                        <ListItem key={item} disablePadding>
                            <Link to={index === 0 ? "/" : `/${item}`}>
                                <ListItemButton sx={{ textAlign: 'center' }}>
                                    <ListItemText primary={item} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    ))
                )
                }
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;



    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Techno Masr
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {auth ? (
                            authNavItems.map((item, index) => (
                                item === "logout" ? (
                                    <Button sx={{ color: '#fff' }} key={item} onClick={logout}>
                                        {item}
                                    </Button>
                                ) : (
                                    <Link to={index === 0 ? "/" : `/${item}`} key={item}>
                                        <Button sx={{ color: '#fff' }}>
                                            {item}
                                        </Button>
                                    </Link>
                                )

                            ))
                        ) : (
                            navItems.map((item, index) => (
                                <Link to={index === 0 ? "/" : `/${item}`} key={item}>
                                    <Button sx={{ color: '#fff' }}>
                                        {item}
                                    </Button>
                                </Link>
                            ))
                        )

                        }
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>

        </Box>
    );
}

Navbar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Navbar;
