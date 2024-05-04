"use client"
import React from 'react';
import axios from 'axios';
import {useRouter} from "next/navigation";
import {useSearchParams} from "next/navigation";
import {AuthContext, AuthContextType} from "@/context/AuthContext";

const GoogleAuthCallback = () => {
    const authContext = React.useContext<AuthContextType | undefined>(AuthContext);
    const LoggedInUser = authContext?.LoggedInUser

    const searchParams = useSearchParams()
    const router = useRouter();

    React.useEffect(() => {
        const handler = async () => {
            const code: string | null = searchParams.get('code') ?? null;

            if (code) {
                try {
                    const response = await axios.get(`${process.env.BASE_API_URL}/google/authenticate/?code=${code}`)
                    await LoggedInUser?.(response.data.access, response.data.refresh);
                    return router.push('/');
                }catch (error){
                    return router.push('/auth/login');
                }
            }else{
                router.push('/auht/login')
            }
        }
        handler();
    }, []);
};

export default GoogleAuthCallback;