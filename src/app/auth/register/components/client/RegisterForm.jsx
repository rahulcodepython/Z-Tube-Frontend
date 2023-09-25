"use client"
import React from 'react'
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';

const RegisterForm = () => {
    const handleSubmit = (values) => {
        const HandleTostify = new Promise((resolve, rejected) => {
            axios.post(`${process.env.BACKEND_DOMAIN_NAME}user/auth/users/`, values)
                .then((response) => {
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
    }
    return (
        <Formik initialValues={{ email: '', password: '', first_name: '', last_name: '' }} onSubmit={(values) => handleSubmit(values)}>
            <Form className="flex flex-col gap-6">
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <label className="block text-gray-700">First Name</label>
                        <Field type="first_name" name="first_name" id="first_name" placeholder="Enter Your First Name" className="w-full px-4 py-3 rounded-lg bg-gray-200 border focus:border-black focus:bg-white focus:outline-none" autoFocus autoComplete="name" required />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className="block text-gray-700">Last Name</label>
                        <Field type="last_name" name="last_name" id="last_name" placeholder="Enter Your Last Name" className="w-full px-4 py-3 rounded-lg bg-gray-200 border focus:border-black focus:bg-white focus:outline-none" autoFocus autoComplete="name" required />
                    </div>
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

export default RegisterForm