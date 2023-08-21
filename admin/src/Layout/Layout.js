import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, Chip, Tooltip } from '@mui/material';
import VideoChatIcon from '@mui/icons-material/VideoChat';
import PersonIcon from '@mui/icons-material/Person';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link, Navigate, useLocation } from 'react-router-dom';
import Paths from '../commen/Paths';




const drawerWidth = 240;

function Layout(props) {

    const {Auth , setAuth,component} = props

    const location = useLocation()

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <Link to={Paths.DashBoard}>
                <ListItem disablePadding>
                    <ListItemButton  selected={location.pathname === Paths.DashBoard} >
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary={"DashBoard"} />
                    </ListItemButton>
                </ListItem>
                </Link>

                <Link to={Paths.Product}>
                <ListItem disablePadding>
                    <ListItemButton  selected={location.pathname === Paths.Product} >
                        <ListItemIcon>
                            <ProductionQuantityLimitsIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Product"} />
                    </ListItemButton>
                </ListItem>
                </Link>

                <Link to={Paths.user}>
                <ListItem disablePadding>
                    <ListItemButton  selected={location.pathname === Paths.user} >
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary={"User"} />
                    </ListItemButton>
                </ListItem>
                </Link>

                <Link to={Paths.Login}>
                <ListItem disablePadding>
                    <ListItemButton  selected={location.pathname === Paths.Login} >
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Login"} />
                    </ListItemButton>
                </ListItem>
                </Link>

            </List>
                 
        </div>
    );

    const container = window !== undefined ? () => window.document.body : undefined;

    if(!Auth){
        return <Navigate to={Paths.Login} /> 
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline /> 
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: "100%" },
                    ml: { sm: `${drawerWidth}px` },
                    zIndex: "9999"
                }}
            >
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
                    <div className='d-flex align-item-center justify-content-between w-100'>
                        <div className='d-flex align-item-center gap-2'>
                          
                            <Typography variant="h6" className='fw-bold mt-1' style={{ letterSpacing: "0px"  }} noWrap component="div">
                              Amazon
                            </Typography>
                        </div>
                        <div className='d-flex search align-items-center' style={{ position: "relative" }}>
                            <input type='text' placeholder='Search..'/>
                            <SearchIcon className='text-muted' style={{ position: "absolute", right: "0.4rem" }} />

                        </div>
                        <div className='d-flex align-items-center icons'>
                            <ul className='mb-0'>
                                <li style={{ listStyle: "none" }}>
                                    <Tooltip style={{ zIndex: "10000001", position: "relative", top: 0 }} title="Create Or Upload">
                                        <IconButton color="dark">
                                            <VideoChatIcon className='text-light' />
                                        </IconButton>
                                    </Tooltip>
                                </li>
                            </ul>
                            <IconButton color="dark">
                                <NotificationsNoneIcon className='text-light' />
                            </IconButton>
                            <Chip avatar={<Avatar>P</Avatar>} label="Paras" className='text-light' />
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {component}
            </Box>
        </Box>
    );
}

export default Layout;