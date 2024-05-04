import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button";
import axios from "axios";

const GoogleLoginButton = ({ label }: { label: string }) => {
    return <Button onClick={() => GoogleSignIn()} className="gap-2 w-full" variant="outline">
        <Image className="w-5 h-5" src="/svg/google.svg" loading="lazy" alt="google logo" width={20} height={20} />
        <span>
            {label || 'Sign in with Google'}
        </span>
    </Button>
}

const GoogleSignIn = async () => {
    try {
        const response = await axios.get(`${process.env.BASE_API_URL}/google/auth/`);
        window.location.href = response.data.url;
    } catch (error) {
        console.error('Google authentication error:', error);
    }
};

export default GoogleLoginButton