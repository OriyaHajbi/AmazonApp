import Layout from "@/components/Layout";
import { Store } from "@/utils/Store";
import { Box, Button, Card, Grid, Link, List, ListItem, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import axios from "axios";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useContext } from "react";

function CartScreen() {
    const {
        state: { cart: { cartItems } },
        dispatch,
    } = useContext(Store);
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const updateCartHandler = async (item, quantity) => {
        const { data } = await axios.get(`/api/products/${item._id}`);
        if (data.countInStock < quantity) {
            enqueueSnackbar('Sorry, Product is out of stock', { variant: 'error' });
            return;
        }
        dispatch({
            type: 'CART_ADD_ITEM',
            payload: {
                _key: item._key,
                name: item.name,
                countInStock: item.countInStock,
                slug: item.slug,
                price: item.price,
                image: item.image,
                quantity,
            },
        });
        enqueueSnackbar(`${item.name} updated in the cart`, {
            variant: 'success'
        });
    };

    const removeItemHandler = async (item) => {
        dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
    };
    return (
        <Layout title="Shopping Cart">
            <Typography component="h1" variant="h1">
                Shopping Cart
            </Typography>
            {cartItems.length === 0 ? (
                <Box>
                    <Typography>Cart is empty.{' '}
                        <Link href="/">
                            Go Shopping
                        </Link>
                    </Typography>
                </Box>
            ) : (
                <Grid container spacing={1}>
                    <Grid item md={9} xs={12}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Image</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right">Quantity</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                        <TableCell align="right">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cartItems.map((item) => (
                                        <TableRow key={item.slug}>
                                            <TableCell>
                                                <Link href={`/product/${item.slug}`}>
                                                    <Image src={item.image} alt={item.name} width={50} height={50} />
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Link href={`/product/${item.slug}`}>
                                                    <Typography>{item.name}</Typography>
                                                </Link>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Select value={item.quantity} onChange={(e) => updateCartHandler(item, e.target.value)}>
                                                    {[...Array(item.countInStock).keys()].map((x) => (
                                                        <MenuItem key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography>${item.price}</Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button variant="contained" color="secondary" onClick={() => removeItemHandler(item)}>
                                                    x
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <Card>
                            <List>
                                <ListItem>
                                    <Typography variant="h2">
                                        Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '} items) : ${' '}
                                        {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Button fullWidth color="primary" variant="contained"
                                        onClick={() => { router.push('/shipping') }}>
                                        Checkout
                                    </Button>
                                </ListItem>
                            </List>
                        </Card>
                    </Grid>
                </Grid>
            )}
        </Layout>
    )
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false })