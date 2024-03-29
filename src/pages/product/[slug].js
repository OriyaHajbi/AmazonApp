import Layout from "@/components/Layout";
import classes from "@/utils/classes";
import { client } from "@/utils/client";
import { urlFor, urlForThumbnail } from "@/utils/image";
import { Store } from "@/utils/Store";
import { Alert, Button, Card, CircularProgress, Grid, Link, List, ListItem, Rating, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from 'next/legacy/image'
import { useState, useEffect, useContext } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useRouter } from "next/router";

export default function ProductScreen(props) {
    const router = useRouter();
    const { slug } = props;
    const { state: { cart }, dispatch } = useContext(Store);
    const { enqueueSnackbar } = useSnackbar();
    const [state, setstate] = useState({
        product: null,
        loading: true,
        error: '',
    });
    const { product, loading, error } = state;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const product = await client.fetch(`*[_type == "product" && slug.current == $slug][0]`, { slug });
                setstate({ ...state, product, loading: false });
            } catch (error) {
                setstate({ ...state, error: error.message, loading: false });
            }
        };
        fetchData();
    }, []);

    const addToCartHandler = async () => {
        const existItem = cart.cartItems.find(item => item._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/products/${product._id}`);
        if (data.countInStock < quantity) {
            enqueueSnackbar('Sorry, Product is out of stock', { variant: 'error' });
            return;
        }
        dispatch({
            type: 'CART_ADD_ITEM',
            payload: {
                _key: product._id,
                name: product.name,
                countInStock: product.countInStock,
                slug: product.slug.current,
                price: product.price,
                image: urlForThumbnail(product.image),
                quantity,
            },
        });
        enqueueSnackbar(`${product.name} added to the cart`, {
            variant: 'success'
        });
        router.push('/cart');
    }

    return (
        <Layout title={product?.title}>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Alert variant="error">{error}</Alert>
            ) : (
                <Box>
                    <Box sx={classes.section}>
                        <Link href="/">
                            <Typography>Back to result</Typography>
                        </Link>
                    </Box>
                    <Grid container spacing={1}>
                        <Grid item md={6} xs={12}>
                            <Image src={urlFor(product.image)} alt={product.name} layout="responsive" width={640} height={640} />
                        </Grid>
                        <Grid item md={3} xs={12} >
                            <List>
                                <ListItem>
                                    <Typography component="h1" variant="h1">{product.name}</Typography>
                                </ListItem>
                                <ListItem>
                                    Category: {product.category}
                                </ListItem>
                                <ListItem>
                                    Brand: {product.brand}
                                </ListItem>
                                <ListItem>
                                    <Rating value={product.rating} readOnly></Rating>
                                    <Typography sx={classes.smallText}>({product.numReviews} reviews)</Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography>Description: {product.description}</Typography>
                                </ListItem>
                            </List>

                        </Grid>
                        <Grid item md={3} xs={12}>
                            <Card>
                                <List>
                                    <ListItem>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <Typography>Price:</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography>${product.price}</Typography>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                    <ListItem>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <Typography>Status:</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography>{product.countInStock > 0 ? "In Stock" : "Unavailable"}</Typography>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                    <ListItem>
                                        <Button fullWidth variant="contained" onClick={addToCartHandler}>
                                            Add to cart
                                        </Button>
                                    </ListItem>
                                </List>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            )}
        </Layout>
    )

}

export function getServerSideProps(context) {
    return {
        props: { slug: context.params.slug }
    };
}