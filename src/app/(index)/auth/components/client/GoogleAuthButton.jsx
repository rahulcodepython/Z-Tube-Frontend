"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'

const GoogleAuthButton = ({ msg }) => {
    const router = useRouter()

    const FetchGoogleOAuthUrl = () => {
        const HandleTostify = new Promise((resolve, rejected) => {
            axios.get(`${process.env.BACKEND_DOMAIN_NAME}/auth/social/o/google-oauth2/?redirect_uri=${process.env.GOOGLE_OAUTH_REDIRECT_URI}`)
                .then((response) => {
                    setTimeout(() => {
                        router.push(response?.data?.authorization_url)
                    }, 1000);
                    resolve();
                })
                .catch((error) => {
                    rejected();
                });
        });

        toast.promise(
            HandleTostify,
            {
                pending: 'Your request is on process.',
                success: 'Your request is accepted.',
                error: 'There is some issue, Try again.'
            }
        )
    }
    return (
        <span className="ml-4" onClick={FetchGoogleOAuthUrl}>{msg}</span>
    )
}

export default GoogleAuthButton