"use client"
import React from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Formik, Form } from 'formik';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ValidateUser } from '@/utils';
import { Context } from '@/context/Context';

const LoginForm = () => {
    const { setIsAuthenticated, setIsAccessToken, setIsRefreshToken, setAccessToken, setRefreshToken } = React.useContext(Context)

    const router = useRouter();

    return (
        <Formik initialValues={{
            email: '',
            password: ''
        }}
            onSubmit={(values) => {
                const HandleTostify = new Promise((resolve, rejected) => {
                    axios.post(`${process.env.BACKEND_DOMAIN_NAME}/auth/token/jwt/create/`, values)
                        .then(async response => {
                            await ValidateUser(response.data.access, response.data.refresh, setIsAuthenticated, setIsAccessToken, setIsRefreshToken, setAccessToken, setRefreshToken)
                            router.push("/")
                            resolve();
                        })
                        .catch(error => {
                            rejected();
                        });
                });

                toast.promise(
                    HandleTostify,
                    {
                        pending: 'Your request is on process.',
                        success: 'Your are logged in.',
                        error: 'There is some issue, Try again.'
                    }
                )
            }}>
            {({ values, handleChange, handleSubmit }) => (
                <Form className="flex flex-col gap-6">
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="email" className="uppercase text-gray-600 text-xs">Email</Label>
                            <Input type="email" name="email" value={values.email} onChange={handleChange} placeholder="Enter your email" id="email" className="w-full focus-visible:ring-0" autoFocus autoComplete="email" required />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="password" className="uppercase text-gray-600 text-xs">Password</Label>
                            <Input type="password" name="password" value={values.password} onChange={handleChange} placeholder="Enter your password" id="password" className="w-full focus-visible:ring-0" autoFocus autoComplete="password" required />
                        </div>
                        <div className="text-right">
                            <a href="#" className="text-sm font-semibold text-gray-700 hover:text-gray-500 focus:text-gray-500">
                                Forgot Password?
                            </a>
                        </div>
                    </div>
                    <Button type='submit' onClick={handleSubmit}>
                        Log In
                    </Button>
                </Form>
            )}
        </Formik>
    )
}

export default LoginForm