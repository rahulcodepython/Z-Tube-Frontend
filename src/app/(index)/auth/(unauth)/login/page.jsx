"use client"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BiSend, FcGoogle, GoArrowLeft } from '@/data/icons/icons';
import { useRouter } from 'next/navigation';
import { Formik, Form } from 'formik';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Login } from '@/utils';
import { Context } from '@/context/Context';
import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const Page = () => {
    const { setIsAuthenticated, setIsAccessToken, setIsRefreshToken, setAccessToken, setRefreshToken } = React.useContext(Context)

    const router = useRouter();

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
                        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Formik initialValues={{
                        email: '',
                        password: ''
                    }}
                        onSubmit={async values => await Login(values, router, setIsAuthenticated, setIsAccessToken, setIsRefreshToken, setAccessToken, setRefreshToken)}>
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
                    <Button className="w-full">
                        <FcGoogle className='text-2xl' />
                        <span>
                            Login with Google
                        </span>
                    </Button>
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

export default Page;
