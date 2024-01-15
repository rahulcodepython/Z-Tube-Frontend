"use client"
import GoogleAuthButton from '../components/client/GoogleAuthButton';
import Link from 'next/link';
import { BiSend, FcGoogle } from '@/data/icons/icons';
import { Register } from '@/utils/index';
import { Formik, Form } from 'formik';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import React from 'react';

const Page = () => {
    return (
        <div className="md:w-1/2 px-5 flex flex-col justify-center gap-6">
            <div className='flex flex-col gap-2'>
                <h2 className="text-2xl font-bold">Register</h2>
                <p className="text-sm">If you have not an account, please register</p>
            </div>
            <Formik
                initialValues={{
                    first_name: '',
                    last_name: '',
                    email: '',
                    password: '',
                }}
                onSubmit={async values => await Register(values)}>
                {({ values, handleChange, handleSubmit }) => (
                    <Form className="flex flex-col gap-6">
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-col gap-2'>
                                <Label htmlFor="first_name" className="uppercase text-gray-600 text-xs">First Name</Label>
                                <Input type="text" name="first_name" value={values.first_name} onChange={handleChange} placeholder="Enter your first name" id="first_name" className="w-full focus-visible:ring-0" autoFocus autoComplete="first_name" required />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Label htmlFor="last_name" className="uppercase text-gray-600 text-xs">Last Name</Label>
                                <Input type="text" name="last_name" value={values.last_name} onChange={handleChange} placeholder="Enter your last name" id="last_name" className="w-full focus-visible:ring-0" autoFocus autoComplete="last_name" required />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Label htmlFor="email" className="uppercase text-gray-600 text-xs">Email</Label>
                                <Input type="email" name="email" value={values.email} onChange={handleChange} placeholder="Enter your email" id="email" className="w-full focus-visible:ring-0" autoFocus autoComplete="email" required />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Label htmlFor="password" className="uppercase text-gray-600 text-xs">Password</Label>
                                <Input type="password" name="password" value={values.password} onChange={handleChange} placeholder="Choose a password" id="password" className="w-full focus-visible:ring-0" autoFocus autoComplete="password" required />
                            </div>
                            <div className="text-right">
                                <a href="#" className="text-sm font-semibold text-gray-700 hover:text-gray-500 focus:text-gray-500">
                                    Forgot Password?
                                </a>
                            </div>
                        </div>
                        <Button type="submit" onClick={handleSubmit}>
                            <BiSend className='text-base' />
                            <span>
                                Register
                            </span>
                        </Button>
                    </Form>
                )}
            </Formik>
            <div className="grid grid-cols-3 items-center text-gray-500">
                <hr className="border-gray-500" />
                <p className="text-center text-sm">OR</p>
                <hr className="border-gray-500" />
            </div>
            <Button className="flex items-center">
                <FcGoogle className='text-2xl' />
                <GoogleAuthButton msg={'Register with Google'} />
            </Button>
            <div className="text-sm flex justify-between items-center">
                <p>If you have an account...</p>
                <Link href={'/auth/login'}>
                    <Button>
                        Login
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default Page;
