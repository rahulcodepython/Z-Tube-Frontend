import Image from 'next/image';
import React from 'react'
import Link from 'next/link';
import AuthRouteHandler from '@/lib/Routes/Auth/AuthRouteHandler';

const AuthLayout = ({ children }) => {
    return (
        <AuthRouteHandler>
            <section className="flex items-center justify-center overflow-y-scroll my-5">
                <div className='flex flex-col items-start gap-4'>
                    <Link href={'/'} className='px-3 py-2 bg-black text-white hover:scale-110 transition-all duration-300 ease-in-out rounded-lg'>
                        Back
                    </Link>
                    <div className="bg-gray-100 p-5 flex rounded-2xl shadow-lg max-w-6xl">
                        {children}
                        <div className="w-1/2 md:block hidden">
                            <Image src="/image/loginPage.png" alt="page img" width={800} height={800} className="rounded-2xl" />
                        </div>
                    </div>
                </div>
            </section>
        </AuthRouteHandler>
    )
}

export default AuthLayout