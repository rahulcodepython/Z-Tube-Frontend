"use client"
import React from 'react'
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Encrypt } from '@/functions/Encrypt';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const router = useRouter();

    const handleSubmit = (values) => {
        const HandleTostify = new Promise((resolve, rejected) => {
            axios.post(`${process.env.BACKEND_DOMAIN_NAME}user/auth/jwt/create/`, values)
                .then((response) => {
                    setTimeout(() => {
                        router.push("/")
                    }, 3000);
                    resolve();
                    localStorage.setItem('refresh', Encrypt(response.data.refresh, process.env.ENCRYPTION_KEY));
                    sessionStorage.setItem('access', Encrypt(response.data.access, process.env.ENCRYPTION_KEY));
                    sessionStorage.setItem("email", response.data.email)
                    sessionStorage.setItem("first_name", response.data.first_name)
                    sessionStorage.setItem("last_name", response.data.last_name)
                    sessionStorage.setItem("username", response.data.username)
                })
                .catch((error) => {
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
    return (
        <Formik initialValues={{ email: '', password: '' }} onSubmit={(values) => handleSubmit(values)}>
            <Form className="flex flex-col gap-6">
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <label className="block text-gray-700">Email Address</label>
                        <Field type="email" name="email" id="email" placeholder="Enter Email Address" className="w-full px-4 py-3 rounded-lg bg-gray-200 border focus:border-black focus:bg-white focus:outline-none" autoFocus autoComplete="email" required />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className="block text-gray-700">Password</label>
                        <Field type="password" name="password" id="password" placeholder="Enter Password" minLength="6" className="w-full px-4 py-3 rounded-lg bg-gray-200 border focus:border-black focus:bg-white focus:outline-none" required />
                    </div>
                    <div className="text-right">
                        <a href="#" className="text-sm font-semibold text-gray-700 hover:text-gray-500 focus:text-gray-500">
                            Forgot Password?
                        </a>
                    </div>
                </div>
                <button type="submit" className="w-full block bg-black  hover:scale-105 duration-300 text-white font-semibold rounded-lg px-4 py-3">
                    Log In
                </button>
            </Form>
        </Formik>
    )
}

export default LoginForm