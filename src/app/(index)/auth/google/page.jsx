"use client"
import React from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import axios from 'axios'
import Link from 'next/link'
import { Context } from '@/context/Context'


const Page = () => {
    const [loading, setLoading] = React.useState(true)
    const [isAuth, setIsAuth] = React.useState(false)

    const searchParams = useSearchParams()

    const { setIsAuthenticated } = React.useContext(Context)

    const state = searchParams.get('state')
    const code = searchParams.get('code')
    const scope = searchParams.get('scope')
    const authuser = searchParams.get('authuser')
    const prompt = searchParams.get('prompt')

    React.useEffect(() => {

        const AuthenticateUser = async () => {
            // const config = {
            //     headers: {
            //         'Content-Type': 'application/x-www-form-urlencoded'
            //     }
            // }

            // const url = `${process.env.BACKEND_DOMAIN_NAME}user/auth/o/google-oauth2/?state=${encodeURIComponent(state)}&code=${encodeURIComponent(code)}`

            // await axios.post(url, config)
            //     .then(response => {
            //         console.log(response);
            //         // sessionStorage.setItem('access', response.data.access)
            //         // localStorage.setItem('refresh', response.data.refresh)
            //         // setIsAuthenticated(pre => true)
            //         // setIsAuth(pre => true)
            //         setLoading(pre => false)
            //     })
            //     .catch(error => {
            //         console.log(error);
            //         // setIsAuthenticated(pre => false)
            //     })
            setLoading(pre => false)
        }

        AuthenticateUser();
    }, [])


    return loading ? <div className="md:w-1/2 px-5 flex flex-col items-center justify-center gap-6">
        <Image src={'/gif/loading.gif'} width={200} height={200} alt='success' className='mix-blend-multiply' />
        <div className='text-black text-3xl font-extrabold'>
            Proccessing
        </div>
        <div>
            Wait for a second
        </div>
    </div> :
        isAuth ? <div className="md:w-1/2 px-5 flex flex-col items-center justify-center gap-6">
            <Image src={'/gif/success.gif'} width={200} height={200} alt='success' className='mix-blend-multiply' />
            <div className='text-green-600 text-3xl font-extrabold'>
                Success
            </div>
            <div>
                You are now verified
            </div>
            <Link href={'/'} className='px-4 py-2 rounded-lg bg-green-600 text-white'>
                Enjoy your feed
            </Link>
        </div> :
            <div className="md:w-1/2 px-5 flex flex-col items-center justify-center gap-6">
                <Image src={'/gif/failed.gif'} width={200} height={200} alt='failed' className='mix-blend-multiply' />
                <div className='text-red-600 text-3xl font-extrabold'>
                    Failed
                </div>
                <div>
                    Sorry! There is some issue. Please try again.
                </div>
                <Link href={'/auth/login'} className='px-4 py-2 rounded-lg bg-red-600 text-white'>
                    Go to Login
                </Link>
            </div>
}

export default Page