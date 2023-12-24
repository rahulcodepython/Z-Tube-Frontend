"use client"
import React from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Encrypt } from '@/functions/Encrypt';
import { Formik, Form } from 'formik';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const RegisterForm = () => {
    return (
        <Formik
            initialValues={{
                first_name: '',
                last_name: '',
                email: '',
                password: '',
            }}
            onSubmit={values => {
                const HandleTostify = new Promise((resolve, rejected) => {
                    axios.post(`${process.env.BACKEND_DOMAIN_NAME}/auth/dj/users/`, values)
                        .then((response) => {
                            localStorage.setItem("email", values.email)
                            localStorage.setItem("password", Encrypt(values.password, process.env.ENCRYPTION_KEY))
                            resolve();
                        })
                        .catch((error) => {
                            rejected();
                        });
                });

                toast.promise(
                    HandleTostify,
                    {
                        pending: 'Your request is on process.',
                        success: 'Your request is accepted.',
                        error: 'Your request is denied.'
                    }
                )
            }}>
            {({ values, handleChange, handleSubmit }) => (
                <Form className="flex flex-col gap-6">
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="first_name" className="uppercase text-gray-600 text-xs">First Name</Label>
                            <Input type="text" name="first_name" value={values.first_name} onChange={handleChange} placeholder="Enter your first name" id="first_name" className="w-full p-6 rounded-lg focus:outline-none" autoFocus autoComplete="first_name" required />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="last_name" className="uppercase text-gray-600 text-xs">Last Name</Label>
                            <Input type="text" name="last_name" value={values.last_name} onChange={handleChange} placeholder="Enter your last name" id="last_name" className="w-full p-6 rounded-lg focus:outline-none" autoFocus autoComplete="last_name" required />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="email" className="uppercase text-gray-600 text-xs">Email</Label>
                            <Input type="email" name="email" value={values.email} onChange={handleChange} placeholder="Enter your email" id="email" className="w-full p-6 rounded-lg focus:outline-none" autoFocus autoComplete="email" required />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="password" className="uppercase text-gray-600 text-xs">Password</Label>
                            <Input type="password" name="password" value={values.password} onChange={handleChange} placeholder="Choose a password" id="password" className="w-full p-6 rounded-lg focus:outline-none" autoFocus autoComplete="password" required />
                        </div>
                        <div className="text-right">
                            <a href="#" className="text-sm font-semibold text-gray-700 hover:text-gray-500 focus:text-gray-500">
                                Forgot Password?
                            </a>
                        </div>
                    </div>
                    <Button type="submit" onClick={handleSubmit}>
                        Register
                    </Button>
                </Form>
            )}
        </Formik>
    )
}

export default RegisterForm