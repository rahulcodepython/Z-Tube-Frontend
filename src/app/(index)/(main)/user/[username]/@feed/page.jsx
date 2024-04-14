"use client"
import React from 'react'
import PostCard from "@/app/(index)/(main)/user/[username]/@feed/components/client/PostCard";
import { AuthContext } from '@/context/AuthContext'
import Loading from "@/app/(index)/(main)/user/[username]/@feed/components/server/loading";
import axios from "axios";
import { DataContext } from '@/context/DataContext';

const Feed = ({ params }) => {
    const { accessToken, userData } = React.useContext(AuthContext)

    const { data, setData } = React.useContext(DataContext)

    const [loading, setLoading] = React.useState('feedPost' in data ? false : true)

    React.useEffect(() => {
        const handler = async () => {
            if ('feedPost' in data) {
                if (decodeURIComponent(params.username) in data.feedPost) {
                    setLoading(false)
                }
            }
            await FetchFeedPost(accessToken, params.username, setData, userData, setLoading);
        }
        handler();
    }, [])

    return loading ? <Loading /> : <div className='grid grid-cols-3 gap-4 mt-8'>
        {
            data.feedPost.length === 0 && Array.isArray(data.feedPost) ? <div>No Post There</div> : data.feedPost[decodeURIComponent(userData.username)].map((item, index) => {
                return <PostCard key={index} feed={item} feedIndex={index} username={params.username} />
            })
        }
    </div>
}

const FetchFeedPost = async (accessToken, username, setData, userData, setLoading) => {
    const options = {
        headers: {
            Authorization: `JWT ${accessToken}`
        }, url: `${process.env.BASE_API_URL}/feed/posts/${username}/`, method: 'GET',
    };

    await axios.request(options).then(response => {
        setData(pre => {
            let newData = { ...pre };
            newData.feedPost = {
                [decodeURIComponent(userData.username)]: response.data
            }
            return newData;
        })
    }).finally(() => setLoading(false))
}

export default Feed