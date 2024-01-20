"use client"
import React from 'react'
import PostCard from './components/server/PostCard'
import { Context } from '@/context/Context'
import { FetchFeedPost } from '@/utils'
import Loading from './loading'

const Page = ({ params }) => {
    const [loading, setLoading] = React.useState(true)
    const [posts, setPosts] = React.useState([])
    const { accessToken, isFeedPost, setIsFeedPost, feedPost, setFeedPost } = React.useContext(Context)

    React.useEffect(() => {
        const handler = async () => {
            await FetchFeedPost(accessToken, setPosts, isFeedPost, setIsFeedPost, feedPost, setFeedPost, decodeURIComponent(params.username))
            setLoading(pre => false)
        }
        handler();
    }, [])

    return (
        loading ? <Loading /> : <div className='grid grid-cols-3 gap-4'>
            {
                posts.map((item, index) => {
                    return <PostCard key={index} post={item} />
                })
            }
        </div>

    )
}

export default Page