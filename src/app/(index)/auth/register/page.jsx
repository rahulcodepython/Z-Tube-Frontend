import { Button } from '@/components/ui/button';
import GoogleAuthButton from '../components/client/GoogleAuthButton';
import RegisterForm from './components/RegisterForm';
import Link from 'next/link';
import { FcGoogle } from '@/data/icons/icons';

const Page = () => {
    return (
        <div className="md:w-1/2 px-5 flex flex-col justify-center gap-6">
            <div className='flex flex-col gap-2'>
                <h2 className="text-2xl font-bold">Register</h2>
                <p className="text-sm">If you have not an account, please register</p>
            </div>
            <RegisterForm />
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
