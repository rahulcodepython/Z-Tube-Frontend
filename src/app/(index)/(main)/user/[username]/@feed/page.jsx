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
            await FetchFeedPost(accessToken, params.username, data, setData, userData)
            setLoading(() => false)
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

const FetchFeedPost = async (accessToken, username, data, setData, userData) => {
    const options = {
        headers: {
            Authorization: `JWT ${accessToken}`
        }, url: `${process.env.BASE_API_URL}/feed/posts/${username}/`, method: 'GET',
    };

    await axios.request(options)
        .then(response => {
            setData({
                ...data,
                feedPost: {
                    [decodeURIComponent(userData.username)]: response.data
                }
            })
        })
}

export default Feed