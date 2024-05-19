"use client"
import React from 'react'
import { AccessToken, AuthContext, AuthContextType, ProfileType } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ReloadIcon } from '@radix-ui/react-icons';

const ECommerceDashboard = () => {
    const authContext = React.useContext<AuthContextType | undefined>(AuthContext)
    const profile = authContext?.profile
    const setProfile = authContext?.setProfile
    const accessToken = authContext?.accessToken

    const [loading, setLoading] = React.useState<boolean>(false)

    return !profile?.isMarchant ? <div className='flex items-center justify-center gap-4 my-8'>
        <span>
            You have not a merchant account yet.
        </span>
        {
            loading ? <Button disabled className="gap-2">
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait
            </Button> :
                <Button onClick={() => handleRequestMarchetAccount(accessToken, profile, setProfile, setLoading)}>
                    Create Merchant Account
                </Button>
        }
    </div> : <div>
        ECommerce Dashboard
    </div>
}

const handleRequestMarchetAccount = async (
    accessToken: AccessToken | undefined,
    profile: ProfileType | null | undefined,
    setProfile: React.Dispatch<React.SetStateAction<ProfileType | null>> | undefined,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
    setLoading(true)
    try {
        const options = {
            method: 'GET',
            url: `${process.env.BASE_API_URL}/auth/request-marchent-account/`,
            headers: {
                authorization: `JWT ${accessToken}`,
            }
        }
        await axios.request(options)
        setProfile?.(() => {
            return profile ? { ...profile, isMarchant: true } : null
        })
        toast.success('Request has been sent successfully.')
    } catch (error) {
        toast.error('Request has been failed.')
    } finally {
        setLoading(false)
    }
}

export default ECommerceDashboard