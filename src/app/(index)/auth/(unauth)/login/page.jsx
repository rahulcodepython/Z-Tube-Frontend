"use client"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BiSend, GoArrowLeft } from '@/data/icons/icons';
import { Formik, Form } from 'formik';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { GoogleLogin } from '@/utils';
import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import GoogleButton from "react-google-button";
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';

const Page = () => {
    const { LoggedInUser } = React.useContext(AuthContext)
    const router = useRouter()

    return (
        <div className='flex items-center justify-center w-screen h-screen'>
            <Card className="max-w-xl w-full">
                <CardHeader>
                    <CardTitle>
                        <Link href={'/'}>
                            <Button variant="outline" className='border-none p-0 hover:bg-transparent'>
                                <GoArrowLeft className='text-lg' />
                                <span>Back</span>
                            </Button>
                        </Link>
                    </CardTitle>
                    <CardDescription>
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Formik initialValues={{
                        email: '',
                        password: ''
                    }}
                        onSubmit={async values => await Login(values, LoggedInUser, router)}>
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
                                    <BiSend className='text-base' />
                                    <span>
                                        Log In
                                    </span>
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </CardContent>
                <CardFooter className="flex flex-col w-full gap-4">
                    <div className="grid grid-cols-3 items-center text-gray-500 w-full">
                        <hr className="border-gray-500" />
                        <p className="text-center text-sm">OR</p>
                        <hr className="border-gray-500" />
                    </div>
                    <GoogleButton onClick={() => GoogleLogin()} label="Sign in with Google" />
                    <div className="text-sm flex justify-between items-center w-full">
                        <p>If you {`don't`} have an account...</p>
                        <Link href={'/auth/register'}>
                            <Button>
                                Register
                            </Button>
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}

export const Login = async (values, LoggedInUser, router) => {
    const HandleTostify = new Promise((resolve, rejected) => {
        const options = {
            url: `${process.env.BASE_API_URL}/auth/token/jwt/create/`,
            method: 'POST',
            data: values,
        }
        axios.request(options)
            .then(async response => {
                await LoggedInUser(response.data.access, response.data.refresh)
                router.push("/")
                resolve();
            })
            .catch(error => {
                router.push("/auth/login")
                console.log(error);
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
}

export default Page;
