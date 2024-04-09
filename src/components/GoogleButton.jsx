import React from 'react'
import Image from 'next/image'
import { Button } from './ui/button'

const GoogleButton = ({ label, Signin }) => {
    return <Button onClick={() => Signin()} className="gap-2 w-full" variant="outline">
        <Image className="w-5 h-5" src="/svg/google-color.svg" loading="lazy" alt="google logo" width={20} height={20} />
        <span>
            {label || 'Sign in with Google'}
        </span>
    </Button>
}

export default GoogleButton