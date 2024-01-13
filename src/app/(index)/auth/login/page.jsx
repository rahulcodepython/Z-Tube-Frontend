"use client"
import { Button } from '@/components/ui/button';
import GoogleAuthButton from '../components/client/GoogleAuthButton';
import Link from 'next/link';
import { FcGoogle } from '@/data/icons/icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Formik, Form } from 'formik';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ValidateUser } from '@/utils';
import { Context } from '@/context/Context';

const Page = () => {
    const { setIsAuthenticated, setIsAccessToken, setIsRefreshToken, setAccessToken, setRefreshToken } = React.useContext(Context)

    const router = useRouter();

    return (
        <div className="md:w-1/2 px-5 flex flex-col justify-center gap-6">
            <div className='flex flex-col gap-2'>
                <h2 className="text-2xl font-bold">Login</h2>
                <p className="text-sm">If you have an account, please login</p>
            </div>
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
            <div className="grid grid-cols-3 items-center text-gray-500">
                <hr className="border-gray-500" />
                <p className="text-center text-sm">OR</p>
                <hr className="border-gray-500" />
            </div>
            <Button className="flex items-center">
                <FcGoogle className='text-2xl' />
                <GoogleAuthButton msg={'Login with Google'} />
            </Button>
            <div className="text-sm flex justify-between items-center">
                <p>If you {`don't`} have an account...</p>
                <Link href={'/auth/register'}>
                    <Button>
                        Register
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default Page;
