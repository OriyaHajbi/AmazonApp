import CheckoutWizard from '@/components/CheckoutWizard'
import Form from '@/components/Form'
import Layout from '@/components/Layout'
import { Store } from '@/utils/Store'
import { Button, List, ListItem, TextField, Typography } from '@mui/material'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

export default function ShippingScreen() {
    const { handleSubmit, control, formState: { errors }, setValue } = useForm();
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const { userInfo, cart: { shippingAddress } } = state;

    useEffect(() => {
        if (!userInfo) {
            router.push('/login?redirect=/shipping');
        }
        setValue('fullName', shippingAddress.fullName);
        setValue('address', shippingAddress.address);
        setValue('city', shippingAddress.city);
        setValue('postalCode', shippingAddress.postalCode);
        setValue('country', shippingAddress.country);
    }, [router, setValue, shippingAddress, userInfo]);

    const submitHandler = ({ fullName, address, city, postalCode, country }) => {
        dispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: { fullName, address, city, postalCode, country },
        });
        Cookies.set('shippingAddress', JSON.stringify({ fullName, address, city, postalCode, country }));
        router.push('/payment');
    };

    return (
        <Layout title={"Shipping Address"}>
            <CheckoutWizard activeStep={1}></CheckoutWizard>
            <Form onSubmit={handleSubmit(submitHandler)}>
                <Typography component="h1" variant="h1">
                    Shipping Address
                </Typography>
                <List>
                    <ListItem>
                        <Controller name='fullName'
                            control={control}
                            defaultValue=""
                            rules={{ required: true, minLength: 2 }}
                            render={({ field }) => (
                                <TextField variant='outlined' fullWidth id='fullName' label="Full Name"
                                    inputProps={{ type: 'fullName' }}
                                    error={Boolean(errors.fullName)}
                                    helperText={errors.fullName ?
                                        errors.fullName.type === 'minLength' ? 'Full Name length is more than 2' : 'Full Name is required' : ''}
                                    {...field}>
                                </TextField>)}>
                        </Controller>
                    </ListItem>
                    <ListItem>
                        <Controller name='address'
                            control={control}
                            defaultValue=""
                            rules={{ required: true, minLength: 2 }}
                            render={({ field }) => (
                                <TextField variant='outlined' fullWidth id='address' label="Address"
                                    inputProps={{ type: 'address' }}
                                    error={Boolean(errors.address)}
                                    helperText={errors.address ?
                                        errors.address.type === 'minLength' ? 'Address length is more than 2' : 'Address is required' : ''}
                                    {...field}>
                                </TextField>)}>
                        </Controller>
                    </ListItem>
                    <ListItem>
                        <Controller name='city'
                            control={control}
                            defaultValue=""
                            rules={{ required: true, minLength: 2 }}
                            render={({ field }) => (
                                <TextField variant='outlined' fullWidth id='city' label="City"
                                    inputProps={{ type: 'city' }}
                                    error={Boolean(errors.city)}
                                    helperText={errors.city ?
                                        errors.city.type === 'minLength' ? 'City length is more than 2' : 'City is required' : ''}
                                    {...field}>
                                </TextField>)}>
                        </Controller>
                    </ListItem>
                    <ListItem>
                        <Controller name='postalCode'
                            control={control}
                            defaultValue=""
                            rules={{ required: true, minLength: 2 }}
                            render={({ field }) => (
                                <TextField variant='outlined' fullWidth id='postalCode' label="Postal Code"
                                    inputProps={{ type: 'postal Code' }}
                                    error={Boolean(errors.postalCode)}
                                    helperText={errors.postalCode ?
                                        errors.postalCode.type === 'minLength' ? 'Postal Code length is more than 2' : 'Postal Code is required' : ''}
                                    {...field}>
                                </TextField>)}>
                        </Controller>
                    </ListItem>
                    <ListItem>
                        <Controller name='country'
                            control={control}
                            defaultValue=""
                            rules={{ required: true, minLength: 2 }}
                            render={({ field }) => (
                                <TextField variant='outlined' fullWidth id='country' label="Country"
                                    inputProps={{ type: 'country' }}
                                    error={Boolean(errors.country)}
                                    helperText={errors.country ?
                                        errors.country.type === 'minLength' ? 'Country length is more than 2' : 'Country is required' : ''}
                                    {...field}>
                                </TextField>)}>
                        </Controller>
                    </ListItem>
                    <ListItem>
                        <Button variant='contained' type='submit' fullWidth color='primary'>
                            Continue
                        </Button>
                    </ListItem>
                </List>
            </Form>
        </Layout>
    )
}
