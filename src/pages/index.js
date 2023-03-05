import { useEffect, useState } from 'react';
import Head from 'next/head'
import { Alert, CircularProgress, Grid, Typography } from '@mui/material'
import Layout from '@/components/Layout'
import { client } from '@/utils/client';
import ProductItem from '@/components/ProductItem';


export default function Home() {
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
  }, [])
  return (
    <Layout>
      {loading ? (<CircularProgress />)
        : error ? (<Alert variant='danger'>{error}</Alert>)
          : (<Grid container spacing={3}>
            {products.map((product) => (
              <Grid item md={4} key={product.slug}>
                <ProductItem product={product} />
              </Grid>
            ))}
          </Grid>)}
    </Layout>
  )
}
