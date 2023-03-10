import Form from '@/components/Form';
import Layout from '@/components/Layout';
import { Store } from '@/utils/Store';
import { Button, Link, List, ListItem, TextField, Typography } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, { useContext, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form';

export default function RegisterScreen() {
    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;
    const router = useRouter();


    useEffect(() => {
        if (userInfo) {
            router.push('/');
        }
    }, [router, userInfo])


    const { handleSubmit, control, formState: { errors } } = useForm();
    const { enqueueSnackbar } = useSnackbar();
    const submitHandler = async ({ name, email, password, confirmpassword }) => {
        if (password !== confirmpassword) {
            enqueueSnackbar("passwords don't match", {
                variant: 'error'
            });
            return;
        }
        try {
            console.log("before");
            const { data } = await axios.post('/api/users/register', {
                name, email, password
            });
            console.log("after");
            console.log(data);
            dispatch({ type: 'USER_LOGIN', payload: data });
            Cookies.set('userInfo', JSON.stringify(data));
            router.push('/');
        } catch (err) {
            enqueueSnackbar(err.message, {
                variant: 'error'
            });
        }
    };

    return (
        <Layout title="Register">
            <Form onSubmit={handleSubmit(submitHandler)}>
                <Typography component={"h1"} variant={"h1"}>
                    Register
                </Typography>
                <List>
                    <ListItem>
                        <Controller name='name'
                            control={control}
                            defaultValue=""
                            rules={{ required: true, minLength: 2 }}
                            render={({ field }) => (
                                <TextField variant='outlined' fullWidth id='name' label="Name"
                                    inputProps={{ type: 'name' }}
                                    error={Boolean(errors.name)}
                                    helperText={errors.name ?
                                        errors.name.type === 'minLength' ? 'Name length is more than 2' : 'Name is required' : ''}
                                    {...field}>
                                </TextField>)}>
                        </Controller>
                    </ListItem>
                    <ListItem>
                        <Controller name='email'
                            control={control}
                            defaultValue=""
                            rules={{ required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ }}
                            render={({ field }) => (
                                <TextField variant='outlined' fullWidth id='email' label="Email"
                                    inputProps={{ type: 'email' }}
                                    error={Boolean(errors.email)}
                                    helperText={errors.email ?
                                        errors.email.type === 'pattern' ? 'Email is not valid' : 'Email is required' : ''}
                                    {...field}>
                                </TextField>)}>
                        </Controller>
                    </ListItem>
                    <ListItem>
                        <Controller name='password'
                            control={control}
                            defaultValue=""
                            rules={{ required: true, minLength: 6 }}
                            render={({ field }) => (
                                <TextField variant='outlined' fullWidth id='password' label="Password"
                                    inputProps={{ type: 'password' }}
                                    error={Boolean(errors.password)}
                                    helperText={errors.password ?
                                        errors.password.type === 'minLength' ? 'Password length is more than 5' : 'Password is required' : ''}
                                    {...field}>
                                </TextField>)}>
                        </Controller>
                    </ListItem>
                    <ListItem>
                        <Controller name='confirmpassword'
                            control={control}
                            defaultValue=""
                            rules={{ required: true, minLength: 6 }}
                            render={({ field }) => (
                                <TextField variant='outlined' fullWidth id='confirmpassword' label="Confirm Password"
                                    inputProps={{ type: 'password' }}
                                    error={Boolean(errors.confirmpassword)}
                                    helperText={errors.confirmpassword ?
                                        errors.confirmpassword.type === 'minLength' ? 'Confirm Password length is more than 5' : 'Confirm Password is required' : ''}
                                    {...field}>
                                </TextField>)}>
                        </Controller>
                    </ListItem>
                    <ListItem>
                        <Button variant='contained' type='submit' fullWidth color='primary'>
                            Register
                        </Button>
                    </ListItem>
                    <ListItem>
                        Already have an account? <Link href='/login'>Login</Link>
                    </ListItem>
                </List>
            </Form>
        </Layout>
    )
}
