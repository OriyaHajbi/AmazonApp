import { AppBar, CssBaseline, ThemeProvider, Toolbar, Typography, Container, Box, Link, Switch, Badge, Button, Menu, MenuItem } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import Head from "next/head";
import classes from "../utils/classes";
import { useContext, useEffect, useState } from 'react';
import { Store } from "@/utils/Store";
import jsCookie from 'js-cookie';
import { useRouter } from "next/router";

function Layout({ title, description, children }) {
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const [domLoaded, setDomLoaded] = useState(false);
    const { darkMode, cart, userInfo } = state;

    useEffect(() => {
        setDomLoaded(true);
    }, []);

    const theme = createTheme({
        components: {
            MuiLink: {
                defaultProps: {
                    underline: 'hover'
                }
            }
        },
        typography: {
            h1: {
                fontSize: '1.6rem',
                fontWeight: 400,
                margin: '1rem 0'
            },
            h2: {
                fontSize: '1.4rem',
                fontWeight: 400,
                margin: '1rem 0'
            }
        },
        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: {
                main: '#f0c000',
            },
            secondary: {
                main: '#208080'
            },
        },
    });

    const darkModeChangeHandler = () => {
        dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
        const newDarkMode = !darkMode;
        jsCookie.set('darkMode', newDarkMode ? 'ON' : 'OFF');
    };
    const [anchorEl, setAnchorEl] = useState(null);
    const loginMenuCloseHandler = (e, redirect) => {
        setAnchorEl(null);
        if (redirect) {
            router.push(redirect);
        }
    };

    const loginClickHandler = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const logoutClickHandler = () => {
        setAnchorEl(null);
        dispatch({ type: 'USER_LOGOUT' });
        jsCookie.remove('userInfo');
        jsCookie.remove('cartItems');
        router.push('/');
    };

    return (
        <>
            <Head>
                <title>{title ? `${title} - AmazonApp` : 'AmazonApp'}</title>
                {description && <meta name="description" content={description}></meta>}
            </Head>

            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar position="static" sx={classes.appbar}>
                    <Toolbar sx={classes.toolbar}>
                        <Box display="flex" alignItems="center">
                            <Link href="/">
                                <Typography sx={classes.brand}>AmazonApp</Typography>
                            </Link>
                        </Box>
                        <Box>
                            <Switch checked={darkMode} onChange={darkModeChangeHandler}></Switch>
                            <Link href="/cart">
                                <Typography component="span">
                                    {domLoaded && cart.cartItems.length > 0 ? (
                                        <Badge color="secondary" badgeContent={cart.cartItems.length}>Cart</Badge>
                                    ) : (
                                        'Cart'
                                    )}
                                </Typography>
                            </Link>
                            {userInfo ? (
                                <>
                                    <Button aria-controls="simple-menu"
                                        aria-haspopup="true"
                                        sx={classes.navbarButton}
                                        onClick={loginClickHandler}>
                                        {userInfo.name}
                                    </Button>
                                    <Menu id="simple-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={loginMenuCloseHandler}>
                                        <MenuItem onClick={(e) => loginMenuCloseHandler(e, '/profile')}>
                                            Profile
                                        </MenuItem>
                                        <MenuItem onClick={logoutClickHandler}>
                                            Logout
                                        </MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <Link href="/login">
                                    Login
                                </Link>)}

                        </Box>

                    </Toolbar>
                </AppBar>
                <Container component="main" sx={classes.main}>
                    {children}
                </Container>
                <Box component="footer" sx={classes.footer}>
                    <Typography>AmazonApp</Typography>
                </Box>
            </ThemeProvider>
        </>
    )
}

export default Layout;