"use client"
import React from 'react'
import PostCardSkeleton from './components/server/PostCardSkeleton'
import PostCard from './components/server/PostCard'
import { Context } from '@/context/Context'
import { FetchFeedPost } from '@/utils'

const Page = () => {
    const [loading, setLoading] = React.useState(true)
    const [posts, setPosts] = React.useState([])
    const { isAuthenticated, isAccessToken, accessToken } = React.useContext(Context)

    React.useEffect(() => {
        const handler = async () => {
            isAuthenticated && isAccessToken ? await FetchFeedPost(accessToken, setPosts) : null
            setLoading(pre => false)
        }
        handler();
    }, [])


    return (
        loading ? <PostCardSkeleton /> : <div className='grid grid-cols-3 gap-4'>
            {
                posts.map((item, index) => {
                    return <PostCard key={index} post={item} />
                })
            }
        </div>

    )
}

export default Page