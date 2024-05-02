import React from 'react';
import { BiSend } from 'react-icons/bi';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';
import GoogleLoginButton from '@/components/GoogleLoginButton';
import {AuthContext, AuthContextType, LoggedInUserType} from '@/context/AuthContext';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Link } from 'next-view-transitions';

interface LoginValuesType{
    email: string
    password: string
}

const LoginPage: React.FC = () => {
    const authContext = React.useContext<AuthContextType | undefined>(AuthContext);
    const router = useRouter();

    const LoggedInUser = authContext?.LoggedInUser;

    const handleSubmit = async (values: LoginValuesType) => {
        await login(values, LoggedInUser, router);
    };

    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <Card className="max-w-xl w-full">
                <CardHeader>
                    <CardDescription>
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }} onSubmit={handleSubmit}>
                        {({ values, handleChange, handleSubmit }) => (
                            <Form className="flex flex-col gap-6">
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="email" className="uppercase text-gray-600 text-xs">
                                            Email
                                        </Label>
                                        <Input
                                            type="email"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email"
                                            id="email"
                                            className="w-full"
                                            autoFocus
                                            autoComplete="email"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="password" className="uppercase text-gray-600 text-xs">
                                            Password
                                        </Label>
                                        <Input
                                            type="password"
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            placeholder="Enter your password"
                                            id="password"
                                            className="w-full"
                                            autoFocus
                                            autoComplete="password"
                                            required
                                        />
                                    </div>
                                    <div className="text-right">
                                        <span className="text-sm font-semibold text-gray-700 hover:text-gray-500 focus:text-gray-500 hover:underline">
                                            Forgot Password?
                                        </span>
                                    </div>
                                </div>
                                <Button type="submit" onClick={()=>handleSubmit} className="gap-2">
                                    <BiSend className="text-base" />
                                    <span>Log In</span>
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
                    {/*<GoogleLoginButton label="Sign in with Google" />*/}
                    <GoogleLoginButton label={'Sign in with Google'} />
                    <div className="text-sm flex justify-between items-center w-full">
                        <p>If you {`don't`} have an account...</p>
                        <Link href="/auth/register">
                            <Button>Register</Button>
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

const login = async (values: LoginValuesType, LoggedInUser: LoggedInUserType | undefined, router: any) => {
    try {
        const response = await axios.post(`${process.env.BASE_API_URL}/auth/token/jwt/create/`, values);
        await LoggedInUser?.(response.data.access, response.data.refresh);
        router.push('/');
        toast.success('You are logged in.');
    } catch (error) {
        router.push('/auth/login');
        toast.error('There was an issue. Please try again.');
    }
};

export default LoginPage;
