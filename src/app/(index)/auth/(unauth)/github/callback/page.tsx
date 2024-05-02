import React from 'react';
import axios from 'axios';
import {useRouter} from "next/navigation";
import Loading from "@/components/Loading";
import {useSearchParams} from "next/navigation";

const GithubAuthCallback = () => {
    const [loading, setLoading] = React.useState<boolean>(true)

    const searchParams = useSearchParams()
    const router = useRouter();

    React.useEffect(() => {
        const handler = async () => {
            const code: string | null = searchParams.get('code') ?? null;

            if (code) {
                await axios.get(`${process.env.BASE_API_URL}/github/authenticate/?code=${code}`).then(() => {
                    return router.push('/');
                }).catch(() => {
                    return router.push('/auth/login');
                }).finally(() => {
                    setLoading(false);
                });
            }else{
                router.push('/auht/login')
            }
        }
        handler();
    }, []);

    return loading && <Loading />;
};

export default GithubAuthCallback;