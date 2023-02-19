import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { userLoggedOut } from '../../features/auth/authSlice';

const pages = ['Products', 'Pricing', 'Blog'];

function Navbar() {
    let auth = JSON.parse(localStorage.getItem('auth'))
    let userId = auth?.user?.userID
    let user_name = auth?.user?.username
    let fastname = auth?.user?.fastname
    let lastname = auth?.user?.lastname
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    console.log(auth)

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const footerBg = {
        background: `url(https://www.designbolts.com/wp-content/uploads/2012/12/Worn-Dots-White-Seamless-Pattern.jpg)`,
        backgroundColor: `rgb(2 12 15 / 90%)`,
        backgroundBlendMode: `darken, luminosity`,
        backgroundPossition: `center`,
        backgroundRepeat: `no-repeat`,
        backgroundSize: `100%`,
    };

    const dispatch = useDispatch()

    const logOut = () =>{
      dispatch(userLoggedOut()) 
      localStorage.clear()
      setAnchorElUser(null);
    }

    return (
        <AppBar position="static" style={footerBg} >
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        RISHA
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        RISHA
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Link
                              className='link_navbar'
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Link>
                        ))}

                        { 
                          userId ? ( 
                          <Link 
                          className='link_navbar'
                             to='/dashboard'
                             sx={{ my: 2, color: 'white', display: 'block' }}
                         >
                             Dashboard
                         </Link>):(
                            ''
                         )
                        }
                    </Box>

                    {
                        auth?.user ?(
                            <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar style={{ textTransform: "uppercase", background:"#56a3b5"}} alt={`${fastname?.slice(0, 2)}`} src='/gh' />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <Box p={2} >
                                    <Box mb={3}>
                                        <Typography>User ID: {userId} </Typography>
                                        <Typography> User Name: {user_name}  </Typography>
                                        <Typography> </Typography>
                                    </Box>
    
                                    <MenuItem p={5} onClick={logOut} className=" button-62" 
                                      >
                                        <Typography textAlign="center">Log Out</Typography>
                                    </MenuItem>
    
    
    
                                </Box>
                            </Menu>
                        </Box>
                        ):(
                            <Box sx={{ flexGrow: 0 }}> <Link to="login" className='button-62' style={{paddingLeft: '12px', paddingRight: "12px"}}>Log In</Link> </Box>
                        )
                    }

                    

                    
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;