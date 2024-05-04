"use client";
import Loading from '@/components/Loading';
import { AuthContext, AuthContextType, LoggedInUserType, UserType } from '@/context/AuthContext';
import { Decrypt } from '@/utils';
import React, { useEffect, useState, useContext, Dispatch, SetStateAction } from 'react';
import axios, { AxiosResponse } from 'axios';

const IndexLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(true);

    const authContext = useContext<AuthContextType | undefined>(AuthContext);
    const setUser = authContext?.setUser;
    const LoggedInUser = authContext?.LoggedInUser;
    const LogoutUser = authContext?.LogoutUser;

    useEffect(() => {
        const handler = async () => {
            await CheckUser(setUser, LoggedInUser, LogoutUser);
        };

        handler().finally(() => {
            setLoading(false);
        });
    },);

    return loading ? <Loading /> : <>{children}</>;
};

const VerifyToken = async (token: string): Promise<boolean> => {
    try {
        const options = {
            url: `${process.env.BASE_API_URL}/auth/users/jwt/verify/`,
            method: 'POST',
            data: {
                token: token
            }
        };

        await axios.request(options);
        return true;
    } catch (error) {
        return false;
    }
};

const RefreshTheAccessToken = async (token: string, LoggedInUser: LoggedInUserType | undefined): Promise<void> => {
    const options = {
        url: `${process.env.BASE_API_URL}/auth/users/jwt/refresh/`,
        method: 'POST',
        data: {
            refresh: token
        }
    };

    const response: AxiosResponse<any> = await axios.request(options);
    await LoggedInUser?.(response.data.access, response.data.refresh);
};

const FetchUserData = async (token: string, setUser: Dispatch<SetStateAction<UserType | null>> | undefined): Promise<void> => {
    const options = {
        headers: {
            Authorization: `JWT ${token}`
        },
        url: `${process.env.BASE_API_URL}/auth/users/me/user/`,
        method: 'GET'
    };

    const response: AxiosResponse<any> = await axios.request(options);
    setUser?.(response.data);
};

const CheckUser = async (setUser: Dispatch<SetStateAction<UserType | null>> | undefined, LoggedInUser: LoggedInUserType | undefined, LogoutUser: (() => Promise<void>) | undefined): Promise<void> => {
    const isRefreshTokenExists = localStorage.getItem("refresh") || null;
    const refresh_token = isRefreshTokenExists ? Decrypt(localStorage.getItem("refresh") || '', process.env.ENCRYPTION_KEY) : null;
    const isValidateRefreshToken = refresh_token ? await VerifyToken(refresh_token) : false;

    if (!isValidateRefreshToken) {
        await LogoutUser?.();
    } else {
        const isAccessTokenExists = sessionStorage.getItem("access") || null;
        const access_token = isAccessTokenExists ? Decrypt(sessionStorage.getItem("access") || '', process.env.ENCRYPTION_KEY) : null;
        const isValidateAccessToken = access_token ? await VerifyToken(access_token) : false;

        if (!isValidateAccessToken) {
            await RefreshTheAccessToken(refresh_token || '', LoggedInUser);
        } else {
            await LoggedInUser?.(access_token || '', refresh_token || '');
        }

        await FetchUserData(access_token || '', setUser);
    }
};

export default IndexLayout;
