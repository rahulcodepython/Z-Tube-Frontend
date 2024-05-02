"use client"
import axios from 'axios'
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader
} from "@/components/ui/card"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import {Button} from "@/components/ui/button";
import {ReloadIcon} from "@radix-ui/react-icons";
import {BiSend} from "react-icons/bi";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {AuthContext, AuthContextType, LoggedInUserType} from "@/context/AuthContext";
import {number} from "prop-types";

const VerifyEmail = () => {
    const [code, setCode] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);

    const authContext = React.useContext<AuthContextType | undefined>(AuthContext);
    const LoggedInUser = authContext?.LoggedInUser;

    const router = useRouter();

    return <div className='flex items-center justify-center w-screen h-screen'>
        <Card className="max-w-xl w-full">
            <CardHeader>
                <CardDescription className={'flex items-center justify-center'}>
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Enter your verification code
                    </h1>
                </CardDescription>
            </CardHeader>
            <CardContent className={'flex flex-col gap-8 items-center justify-center mt-8'}>
                <InputOTP maxLength={8} value={code} onChange={e => setCode(e)}>
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
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>
                        Please wait
                    </Button> :
                    <Button onClick={()=>handleSubmit(code, setCode, setLoading, router, LoggedInUser)} className={'gap-2 w-full'}>
                        <BiSend />
                Submit
            </Button>
            }
            </CardContent>
        </Card>
    </div>
}

const handleSubmit = async (code: string | null, setCode: (value: (((prevState: string ) => string) | string)) => void, setLoading: React.Dispatch<React.SetStateAction<boolean>>, router: any, LoggedInUser: LoggedInUserType | undefined): Promise<void> => {
    setLoading(true);
    try {
        if (!code) {
            throw new Error("Code is missing");
        }
        if (code.length < 8){
            throw new Error("Code is incomplete");
        }
        const response = await axios.post(`${process.env.BASE_API_URL}/auth/users/activation/`, {
            uid: parseInt(code?.slice(0, 4), 10),
            token: parseInt(code?.slice(4, 8), 10),
        });
        await LoggedInUser?.(response.data.access, response.data.refresh);
        router.push('/');
        toast.success('You are logged in.');
    } catch (error) {
        toast.error('There was an issue. Please try again.');
    }
    setCode("")
    setLoading(false);
}

export default VerifyEmail