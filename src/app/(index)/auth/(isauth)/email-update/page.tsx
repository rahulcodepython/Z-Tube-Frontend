"use client"
import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AccessToken, AuthContext, AuthContextType, LogoutUserType } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from 'next/navigation';

const EmailUpdate = () => {
    const authContext = React.useContext<AuthContextType | undefined>(AuthContext);

    const [code, setCode] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("")
    const [isRequested, setIsRequested] = React.useState<boolean>(false)
    const [isRequestedLoading, setIsRequestedLoading] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState<boolean>(false)

    const accessToken = authContext?.accessToken
    const LogoutUser = authContext?.LogoutUser

    const router = useRouter()

    return <section className={'flex w-screen h-screen justify-center items-center'}>
        <Card className={'max-w-xl w-full'}>
            <CardHeader>
                <CardTitle>Update Email</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-8'>
                <form onSubmit={e => e.preventDefault()} className={'flex flex-col gap-2 w-full'}>
                    <div className={'flex flex-col gap-2 w-full'}>
                        <Label htmlFor={'new-email'}>New Email</Label>
                        <Input id={'new-email'} value={email} onChange={e => setEmail(e.target.value)} disabled={isRequested} placeholder={'Enter your new email'} />
                    </div>
                    {
                        isRequestedLoading ? <Button disabled className="gap-2">
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </Button> : <Button className={'w-full'} disabled={isRequested}
                            onClick={() => handleRequestEmailUpdate(accessToken, setIsRequested, setIsRequestedLoading, email, setEmail)}>
                            Request For Email Update
                        </Button>
                    }
                </form>
                <form onSubmit={e => e.preventDefault()} className={'flex flex-col gap-4 justify-center items-center w-full'}>
                    <InputOTP maxLength={8} value={code} onChange={e => setCode(e)} disabled={!isRequested}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                            <InputOTPSlot index={6} />
                            <InputOTPSlot index={7} />
                        </InputOTPGroup>
                    </InputOTP>
                    {
                        loading ? <Button disabled className="gap-2 w-full">
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </Button> : <Button className={'w-full'} disabled={!isRequested} onClick={() => handlePasswordUpdate(accessToken, code, setCode, setLoading, LogoutUser, router)}>
                            Update Password
                        </Button>
                    }
                </form>
            </CardContent>
        </Card>

    </section>
}

const handleRequestEmailUpdate = async (
    accessToken: AccessToken | undefined,
    setIsRequested: React.Dispatch<React.SetStateAction<boolean>>,
    setIsRequestedLoading: React.Dispatch<React.SetStateAction<boolean>>,
    email: string,
    setEmail: React.Dispatch<React.SetStateAction<string>>
) => {
    setIsRequestedLoading(true)
    try {
        const options = {
            method: 'GET',
            url: `${process.env.BASE_API_URL}/auth/users/set_email/?email=${email}`,
            headers: {
                Authorization: `JWT ${accessToken}`,
            },
        }
        const response = await axios.request(options)
        toast.success(response.data.success);
        setIsRequested(true)
    } catch (error: any) {
        toast.error(error?.response?.data?.error || "There is some issue. Please try again.")
    } finally {
        setIsRequestedLoading(false)
        setEmail("")
    }
}

const handlePasswordUpdate = async (
    accessToken: AccessToken | undefined,
    code: string,
    setCode: React.Dispatch<React.SetStateAction<string>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    LogoutUser: LogoutUserType | undefined,
    router: any
) => {
    setLoading(true)

    try {
        const options = {
            method: 'POST',
            url: `${process.env.BASE_API_URL}/auth/users/set_password/`,
            headers: {
                authorization: `JWT ${accessToken}`
            },
            data: {
                uid: parseInt(code?.slice(0, 4), 10),
                token: parseInt(code?.slice(4, 8), 10)
            }
        }

        const response = await axios.request(options)
        toast.success(response.data.success)
        await LogoutUser?.();
        router.push('/auth/login')
    } catch (error: any) {
        toast.error(error?.response?.data?.error || "There is some issue. Please try again.")
        setCode("")
    } finally {
        setLoading(false)
    }
}

export default EmailUpdate