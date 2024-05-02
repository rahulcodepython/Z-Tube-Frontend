import React from 'react';
import { BiSend } from 'react-icons/bi';
import GoogleLoginButton from "@/components/GoogleLoginButton";
import { Formik, Form } from 'formik';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Link } from 'next-view-transitions';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader
} from "@/components/ui/card"
import axios from 'axios';
import { toast } from 'react-toastify';

interface RegistrationDataType {
    first_name: string
    last_name: string
    email: string
    password: string
}
const RegisterPage: React.FC = () => {
    const handleSubmit = async (values: RegistrationDataType) => {
        await Register(values);
    };

    return (
        <div className='flex items-center justify-center w-screen h-screen'>
            <Card className="max-w-xl w-full">
                <CardHeader>
                    <CardDescription>
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign up for an account
                        </h1>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Formik
                        initialValues={{
                            first_name: '',
                            last_name: '',
                            email: '',
                            password: '',
                        }}
                        onSubmit={handleSubmit}
                    >
                        {({ values, handleChange, handleSubmit }) => (
                            <Form className="flex flex-col gap-6">
                                <div className='flex flex-col gap-4'>
                                    <div className='flex flex-col gap-2'>
                                        <Label htmlFor="first_name" className="uppercase text-gray-600 text-xs">First Name</Label>
                                        <Input type="text" name="first_name" value={values.first_name} onChange={handleChange} placeholder="Enter your first name" id="first_name" className="w-full" autoFocus autoComplete="given-name" required />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <Label htmlFor="last_name" className="uppercase text-gray-600 text-xs">Last Name</Label>
                                        <Input type="text" name="last_name" value={values.last_name} onChange={handleChange} placeholder="Enter your last name" id="last_name" className="w-full" autoComplete="family-name" required />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <Label htmlFor="email" className="uppercase text-gray-600 text-xs">Email</Label>
                                        <Input type="email" name="email" value={values.email} onChange={handleChange} placeholder="Enter your email" id="email" className="w-full" autoFocus autoComplete="email" required />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <Label htmlFor="password" className="uppercase text-gray-600 text-xs">Password</Label>
                                        <Input type="password" name="password" value={values.password} onChange={handleChange} placeholder="Choose a password" id="password" className="w-full" autoComplete="new-password" required />
                                    </div>
                                    <div className="text-right">
                                        <span className="text-sm font-semibold text-gray-700 hover:text-gray-500 focus:text-gray-500 hover:underline">
                                            Forgot Password?
                                        </span>
                                    </div>
                                </div>
                                <Button type="submit" onClick={()=>handleSubmit} className={'gap-2'}>
                                    <BiSend className='text-base' />
                                    Register
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
                    <GoogleLoginButton label="Sign up with Google" />
                    <div className="text-sm flex justify-between items-center w-full">
                        <p>If you already have an account...</p>
                        <Link href={'/auth/login'}>
                            <Button>
                                Login
                            </Button>
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}

const Register = async (values: RegistrationDataType) => {
    const HandleToastify = new Promise<void>((resolve: ()=>void, reject: ()=>void) => {
        const options = {
            url: `${process.env.BASE_API_URL}/auth/dj/users/`,
            method: 'POST',
            data: values,
        };
        axios.request(options).then(() => {
            resolve();
        }).catch(() => {
            reject();
        });
    });

    toast.promise(
        HandleToastify,
        {
            pending: 'Your request is being processed.',
            success: 'Your request was successful.',
            error: 'There was an issue with your request. Please try again.'
        }
    );
}

export default RegisterPage;
