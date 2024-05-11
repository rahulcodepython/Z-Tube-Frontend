"use client"
import React, { useContext } from 'react'
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

const PasswordUpdate = () => {
    const authContext = useContext<AuthContextType | undefined>(AuthContext);

    const [code, setCode] = React.useState<string>("");
    const [currentPassword, setCurrentPassword] = React.useState<string>("")
    const [newPassword, setNewPassword] = React.useState<string>("")
    const [isRequested, setIsRequested] = React.useState<boolean>(false)
    const [isRequestedLoading, setIsRequestedLoading] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState<boolean>(false)

    const accessToken = authContext?.accessToken
    const LogoutUser = authContext?.LogoutUser

    const router = useRouter()

    return <section className={'flex w-screen h-screen justify-center items-center'}>
        <Card className={'max-w-xl w-full'}>
            <CardHeader>
                <CardTitle>Reset Password</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-8'>
                {
                    isRequestedLoading ? <Button disabled className="gap-2">
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                    </Button> : <Button className={'w-full'} disabled={isRequested}
                        onClick={() => handleRequestPasswordUpdate(accessToken, setIsRequested, setIsRequestedLoading)}>
                        Request For Password Change
                    </Button>
                }
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
                    <div className={'flex flex-col gap-2 w-full'}>
                        <Label htmlFor={'old-password'}>Old Password</Label>
                        <Input id={'old-password'} value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} disabled={!isRequested} placeholder={'Enter your current password'} />
                    </div>
                    <div className={'flex flex-col gap-2 w-full'}>
                        <Label htmlFor={'new-password'}>New Password</Label>
                        <Input id={'new-password'} value={newPassword} onChange={e => setNewPassword(e.target.value)} disabled={!isRequested} placeholder={'Enter your new password'} />
                    </div>
                    {
                        loading ? <Button disabled className="gap-2 w-full">
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </Button> : <Button className={'w-full'} disabled={!isRequested} onClick={() => handlePasswordUpdate(accessToken, code, setCode, currentPassword, setCurrentPassword, newPassword, setNewPassword, setLoading, LogoutUser, router)}>
                            Update Password
                        </Button>
                    }
                </form>
            </CardContent>
        </Card>

    </section>
}

const handleRequestPasswordUpdate = async (
    accessToken: AccessToken | undefined,
    setIsRequested: React.Dispatch<React.SetStateAction<boolean>>,
    setIsRequestedLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    setIsRequestedLoading(true)
    try {
        const options = {
            method: 'GET',
            url: `${process.env.BASE_API_URL}/auth/users/set_password/`,
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
    }
}

const handlePasswordUpdate = async (
    accessToken: AccessToken | undefined,
    code: string,
    setCode: React.Dispatch<React.SetStateAction<string>>,
    currentPassword: string,
    setCurrentPassword: React.Dispatch<React.SetStateAction<string>>,
    newPassword: string,
    setNewPassword: React.Dispatch<React.SetStateAction<string>>,
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
                token: parseInt(code?.slice(4, 8), 10),
                current_password: currentPassword,
                new_password: newPassword
            }
        }

        const response = await axios.request(options)
        toast.success(response.data.success)
        await LogoutUser?.();
        router.push('/auth/login')
    } catch (error: any) {
        toast.error(error?.response?.data?.error || "There is some issue. Please try again.")
        setCurrentPassword("")
        setNewPassword("")
        setCode("")
    } finally {
        setLoading(false)
    }
}

export default PasswordUpdate