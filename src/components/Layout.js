import { AppBar, CssBaseline, ThemeProvider, Toolbar, Typography, Container, Box, Link } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import Head from "next/head";
import NextLink from 'next/link';
import classes from "../utils/classes";

function Layout({ title, description, children }) {
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
            mode: 'light',
            primary: {
                main: '#f0c000',
            },
            secondary: {
                main: '#208080'
            },
        },
    });
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
                        <Link href="/">
                            <Typography sx={classes.brand}>AmazonApp</Typography>
                        </Link>

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