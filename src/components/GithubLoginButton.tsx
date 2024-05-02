import React from 'react'
import Image from 'next/image'
import {Button} from "@/components/ui/button";
import axios from "axios";

const GithubLoginButton = (label: string) => {
    return <Button onClick={() => GithubSignIn()} className="gap-2 w-full" variant="outline">
        <Image className="w-5 h-5" src="/svg/github.svg" loading="lazy" alt="google logo" width={20} height={20} />
        <span>
            {label || 'Sign in with Github'}
        </span>
    </Button>
}

const GithubSignIn = async () => {
    try {
        const response = await axios.get(`${process.env.BASE_API_URL}/github/auth/`);
        window.location.href = response.data.url;
    } catch (error) {
        console.error('Github authentication error:', error);
    }
};

export default GithubLoginButton