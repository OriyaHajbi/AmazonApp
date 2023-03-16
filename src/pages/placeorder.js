import CheckoutWizard from '@/components/CheckoutWizard'
import Layout from '@/components/Layout'
import classes from '@/utils/classes'
import { getError } from '@/utils/error'
import { Store } from '@/utils/Store'
import { Button, Card, CircularProgress, Grid, List, ListItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios'
import Cookies from 'js-cookie'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { enqueueSnackbar, useSnackbar } from 'notistack'
import React, { useContext, useEffect, useState } from 'react'

function PlaceOrderScreen() {
    const { closeSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const {
        userInfo,
        cart: { cartItems, shippingAddress, paymentMethod },
    } = state;

    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
    ;
    const itemsPrice = round2(
        cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
    );
    const shippingPrice = itemsPrice > 200 ? 0 : 15;
    const taxPrice = round2(itemsPrice * 0.15);
    const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);


    useEffect(() => {
        if (!paymentMethod) {
            router.push('/payment')
        }
        if (cartItems.lemgth === 0) {
            router.push('/cart')
        }
    }, [router, paymentMethod, cartItems]);

    const placeOrderHandler = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post("/api/orders", {
                orderItems: cartItems.map((x) => (
                    {
                        ...x,
                        countInStock: undefined,
                        slug: undefined
                    })),
                shippingAddress,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice,
            }, {
                headers: {
                    authorization: `Bearer ${userInfo.token}`
                },
            });
            dispatch({ type: 'CART_CLEAR' });
            Cookies.remove('cartItems');
            setLoading(false);
            router.push(`/order/${data}`)
        } catch (err) {
            setLoading(false);
            enqueueSnackbar(getError(err), { variant: 'error' });
        }
    };
    return (
        <Layout title="Place Order">
            <CheckoutWizard activeStep={3}></CheckoutWizard>
            <Typography component={"h1"} variant={"h1"}>
                Place Order
            </Typography>
            <Grid container spacing={1}>
                <Grid item md={9} xs={12}>
                    <Card sx={classes.section}>
                        <List>
                            <ListItem>
                                <Typography component={"h1"} variant={"h1"}>
                                    Shipping Address
                                </Typography>
                            </ListItem>
                            <ListItem>
                                {shippingAddress.fullName} , {shippingAddress.address}, {' '}
                                {shippingAddress.city} , {shippingAddress.postalCode}, {' '}
                                {shippingAddress.country}
                            </ListItem>
                            <ListItem>
                                <Button variant='contained' color='secondary'
                                    onClick={() => router.push('/shipping')}>
                                    Edit
                                </Button>

                            </ListItem>
                        </List>
                    </Card>
                    <Card sx={classes.section}>
                        <List>
                            <ListItem>
                                <Typography component={"h1"} variant={"h1"}>
                                    Payment Method
                                </Typography>
                            </ListItem>
                            <ListItem>
                                {paymentMethod}
                            </ListItem>
                            <ListItem>
                                <Button variant='contained' color='secondary'
                                    onClick={() => router.push('/payment')}>
                                    Edit
                                </Button>
                            </ListItem>
                        </List>
                    </Card>
                    <Card sx={classes.section}>
                        <List>
                            <ListItem>
                                <Typography component={"h1"} variant={"h1"}>
                                    OrderItems
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Image</TableCell>
                                                <TableCell>Name</TableCell>
                                                <TableCell align='right'>Quantity</TableCell>
                                                <TableCell align='right'>Price</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {cartItems.map((item) => (
                                                <TableRow key={item._key}>
                                                    <TableCell>
                                                        <Link href={`/product${item.slug}`}>
                                                            <Image src={item.image}
                                                                alt={item.name}
                                                                width={50}
                                                                height={50}>
                                                            </Image>
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Link href={`/product${item.slug}`}>
                                                            <Typography>
                                                                {item.name}
                                                            </Typography>
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell align='right'>
                                                        <Typography>
                                                            {item.quantity}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align='right'>
                                                        <Typography>
                                                            ${item.price}
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </ListItem>

                        </List>
                    </Card>
                </Grid>
                <Grid item md={3} xs={12}>
                    <Card sx={classes.section}>
                        <List>
                            <ListItem>
                                <Typography variant='h2'>
                                    Order Summary
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography>Items:</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography align='right'>${itemsPrice}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography>Shipping:</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography align='right'>${shippingPrice}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography><strong>Total:</strong>:</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography align='right'><strong>${totalPrice}</strong></Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Button
                                    onClick={placeOrderHandler}
                                    variant='contained'
                                    color='primary'
                                    fullWidth
                                    disabled={loading}>
                                    Place Order
                                </Button>
                            </ListItem>
                            {loading && (
                                <ListItem>
                                    <CircularProgress />
                                </ListItem>
                            )}
                        </List>
                    </Card>
                </Grid>
            </Grid>
        </Layout>
    )
}

export default dynamic(() => Promise.resolve(PlaceOrderScreen), { ssr: false });

