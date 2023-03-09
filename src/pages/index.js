import { useContext, useEffect, useState } from 'react';
import Head from 'next/head'
import { Alert, CircularProgress, Grid, Typography } from '@mui/material'
import Layout from '@/components/Layout'
import { client } from '@/utils/client';
import ProductItem from '@/components/ProductItem';
import { Store } from '@/utils/Store';
import axios from 'axios';
import { urlForThumbnail } from '@/utils/image';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';


export default function Home() {
  const { state: { cart }, dispatch } = useContext(Store);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [state, setstate] = useState({
    products: [],
    error: '',
    loading: true,
  });
  const { products, error, loading } = state;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await client.fetch(`*[_type == "product"]`);
        setstate({ products, loading: false });
      } catch (error) {
        setstate({ error: error.message, loading: false });
      }
    };
    fetchData();
  }, []);

  const addToCartHandler = async (product) => {
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
    <Layout>
      {loading ? (<CircularProgress />)
        : error ? (<Alert variant='danger'>{error}</Alert>)
          : (<Grid container spacing={3}>
            {products.map((product) => (
              <Grid item md={4} key={product.slug.current}>
                <ProductItem product={product} addToCartHandler={addToCartHandler} />
              </Grid>
            ))}
          </Grid>)}
    </Layout>
  )
}
