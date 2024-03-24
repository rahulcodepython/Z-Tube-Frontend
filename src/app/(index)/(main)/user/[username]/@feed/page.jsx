"use client"
import React from 'react'
import PostCard from './components/client/PostCard'
import { AuthContext } from '@/context/AuthContext'
import Loading from './loading'
import axios from "axios";

const Page = ({ params }) => {
    const [loading, setLoading] = React.useState(true)
    const [feedPost, setFeedPost] = React.useState([])

    const { accessToken } = React.useContext(AuthContext)

    React.useEffect(() => {
        const handler = async () => {
            await FetchFeedPost(accessToken, setFeedPost, params.username)
            setLoading(() => false)
        }
        handler();
    }, [])

    return (loading ? <Loading /> : <div className='grid grid-cols-3 gap-4 mt-8'>
        {feedPost.length === 0 ? <div>No Post There</div> : feedPost.map((item, index) => {
            return <PostCard key={index} feed={item} />
        })}
    </div>

    )
}

const FetchFeedPost = async (accessToken, setFeedPost, username) => {
    const options = {
        headers: {
            Authorization: `JWT ${accessToken}`
        }, url: `${process.env.BASE_API_URL}/feed/posts/${username}/`, method: 'GET',
    };

    await axios.request(options)
        .then(response => {
            setFeedPost(() => response.data)
        })
}

export default Page