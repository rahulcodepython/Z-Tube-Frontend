import { Button } from '@/components/ui/button';
import GoogleAuthButton from '../components/client/GoogleAuthButton';
import LoginForm from './components/LoginForm';
import Link from 'next/link';
import { FcGoogle } from '@/data/icons/icons';

const Page = () => {
    return (
        <div className="md:w-1/2 px-5 flex flex-col justify-center gap-6">
            <div className='flex flex-col gap-2'>
                <h2 className="text-2xl font-bold">Login</h2>
                <p className="text-sm">If you have an account, please login</p>
            </div>
            <LoginForm />
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
