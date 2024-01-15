import Image from 'next/image';
import React from 'react'
import Link from 'next/link';
import AuthRouteHandler from '@/lib/Routes/Auth/AuthRouteHandler';
import { Button } from '@/components/ui/button';
import { GoArrowLeft } from '@/data/icons/icons';

const AuthLayout = ({ children }) => {
    return (
        <AuthRouteHandler>
            <section className="flex items-center justify-center overflow-y-scroll my-5">
                <div className='flex flex-col items-start gap-4'>
                    <Link href={'/'}>
                        <Button>
                            <GoArrowLeft className='text-lg' />
                            Back
                        </Button>
                    </Link>
                    <div className="p-5 flex shadow-lg shadow-slate-500/50 rounded-lg max-w-6xl">
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