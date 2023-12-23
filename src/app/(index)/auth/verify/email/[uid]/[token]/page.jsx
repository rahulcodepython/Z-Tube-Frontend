import React from 'react'
import axios from "axios";
import Image from 'next/image';
import Link from 'next/link';
import AutoLoginButton from './components/AutoLoginButton';
import { Button } from '@/components/ui/button';

const Page = async ({ params }) => {
    try {
        const response = await axios.post(`${process.env.BACKEND_DOMAIN_NAME}/auth/dj/users/activation/`, {
            uid: params.uid, token: params.token
        })

        if (response.status === 204) {
            return (
                <div className="md:w-1/2 px-5 flex flex-col items-center justify-center gap-6">
                    <Image src={'/gif/success.gif'} width={200} height={200} alt='success' className='mix-blend-multiply' />
                    <div className='text-green-600 text-3xl font-extrabold'>
                        Success
                    </div>
                    <div>
                        You are now verified
                    </div>
                    <AutoLoginButton />
                </div>
            )
        }
    } catch (error) {
        return (
            <div className="md:w-1/2 px-5 flex flex-col items-center justify-center gap-6">
                <Image src={'/gif/failed.gif'} width={200} height={200} alt='failed' className='mix-blend-multiply' />
                <div className='text-red-600 text-3xl font-extrabold'>
                    Failed
                </div>
                <div>
                    Sorry! There is some issue. Please try again.
                </div>
                <Link href={'/auth/register'}>
                    <Button className="bg-red-600 text-white">
                        Go to Register
                    </Button>
                </Link>
            </div>
        )
    }
}

export default Page