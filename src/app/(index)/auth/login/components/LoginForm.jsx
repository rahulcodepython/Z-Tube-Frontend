"use client"
import React from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Encrypt } from '@/functions/Encrypt';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const LoginForm = () => {
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (values) => handleSubmit(values)
    })

    const handleSubmit = (values) => {
        const HandleTostify = new Promise((resolve, rejected) => {
            axios.post(`${process.env.BACKEND_DOMAIN_NAME}/auth/token/jwt/create/`, values)
                .then((response) => {
                    setTimeout(() => {
                        router.push("/")
                    }, 3000);
                    localStorage.setItem('refresh', Encrypt(response.data.refresh, process.env.ENCRYPTION_KEY));
                    sessionStorage.setItem('access', Encrypt(response.data.access, process.env.ENCRYPTION_KEY));
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
                success: 'Your are logged in.',
                error: 'There is some issue, Try again.'
            }
        )
    }

    return (
        <form className="flex flex-col gap-6">
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <Label htmlFor="email" className="uppercase text-gray-600 text-xs">Email</Label>
                    <Input type="email" value={formik.values.email} onChange={formik.handleChange} placeholder="Enter your email" id="email" className="w-full p-6 rounded-lg focus:outline-none" autoFocus autoComplete="email" required />
                </div>
                <div className='flex flex-col gap-2'>
                    <Label htmlFor="password" className="uppercase text-gray-600 text-xs">Password</Label>
                    <Input type="password" value={formik.values.password} onChange={formik.handleChange} placeholder="Enter your password" id="password" className="w-full p-6 rounded-lg focus:outline-none" autoFocus autoComplete="password" required />
                </div>
                <div className="text-right">
                    <a href="#" className="text-sm font-semibold text-gray-700 hover:text-gray-500 focus:text-gray-500">
                        Forgot Password?
                    </a>
                </div>
            </div>
            <Button type='submit' onClick={formik.handleSubmit}>Log In</Button>
        </form>
    )
}

export default LoginForm