import LoginForm from './components/client/LoginForm';
import Link from 'next/link';

const Page = () => {
    return (
        <div className="md:w-1/2 px-5 flex flex-col justify-center gap-6">
            <div className='flex flex-col gap-2'>
                <h2 className="text-2xl font-bold text-black">Login</h2>
                <p className="text-sm text-black">If you have an account, please login</p>
            </div>
            <LoginForm />
            <div className="grid grid-cols-3 items-center text-gray-500">
                <hr className="border-gray-500" />
                <p className="text-center text-sm">OR</p>
                <hr className="border-gray-500" />
            </div>
            <button className="bg-white border py-2 w-full rounded-xl flex justify-center items-center text-sm hover:scale-105 duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="w-6 h-6" viewBox="0 0 48 48">
                    <defs>
                        <path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" />
                    </defs>
                    <clipPath id="b">
                        <use xlinkHref="#a" overflow="visible" />
                    </clipPath>
                    <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
                    <path clipPath="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" />
                    <path clipPath="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
                    <path clipPath="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
                </svg>
                <span className="ml-4 text-black">Login with Google</span>
            </button>
            <div className="text-sm flex justify-between items-center">
                <p>If you {`don't`} have an account...</p>
                <Link href={'/auth/register'} className="py-2 px-5 bg-white text-black border rounded-xl hover:scale-110 duration-300 border-black">
                    Register
                </Link>
            </div>
        </div>
    );
}

export default Page;
