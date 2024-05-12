"use client"
import React from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { AuthContext, AuthContextType } from "@/context/AuthContext";
import { FetchUserData } from "@/utils";
import { toast } from "react-toastify";

const GoogleAuthCallback = () => {
    const authContext = React.useContext<AuthContextType | undefined>(AuthContext);
    const LoggedInUser = authContext?.LoggedInUser
    const setUser = authContext?.setUser;

    const searchParams = useSearchParams()
    const router = useRouter();

    React.useEffect(() => {
        const handler = async () => {
            const code: string | null = searchParams.get('code') ?? null;

            if (code) {
                try {
                    const response = await axios.get(`${process.env.BASE_API_URL}/google/authenticate/?code=${code}`)
                    await LoggedInUser?.(response.data.access, response.data.refresh);
                    await FetchUserData(response.data.access, setUser);
                    return router.push('/');
                } catch (error: any) {
                    toast.success(error?.response?.data?.error ?? "There is some issue.");
                    return router.push('/auth/login');
                }
            } else {
                toast.success("The code is not found. Please try again.");
                router.push('/auth/login')
            }
        }
        handler();
    }, []);
};

export default GoogleAuthCallback;