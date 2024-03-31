import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const EmailVerifyFailure = () => {
    return (
        <Card className="px-5 flex flex-col items-center justify-center gap-6 max-w-lg p-8">
            <Image src={'/gif/failed.gif'} width={200} height={200} alt='failed' className='mix-blend-multiply' />
            <div className='text-red-600 text-3xl font-extrabold'>
                Failed
            </div>
            <div>
                Sorry! There is some issue. Please try again.
            </div>
            <Link href={'/auth/register'}>
                <Button className="bg-red-600 text-white hover:bg-red-600">
                    Go to Register
                </Button>
            </Link>
        </Card>
    )
}

export default EmailVerifyFailure