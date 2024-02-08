"use client"
import React from 'react'
import PostCard from './components/client/PostCard'
import { Context } from '@/context/Context'
import { FetchFeedPost } from '@/utils'
import Loading from './loading'

const Page = ({ params }) => {
    const [loading, setLoading] = React.useState(true)
    const [feedPost, setFeedPost] = React.useState([])
    const { isAccessToken, accessToken } = React.useContext(Context)

    React.useEffect(() => {
        const handler = async () => {
            await FetchFeedPost(isAccessToken, accessToken, setFeedPost, (params.username))
            setLoading(pre => false)
        }
        handler();
    }, [])

    return (
        loading ? <Loading /> : <div className='grid grid-cols-3 gap-4'>
            {
                feedPost.length === 0 ? <div>No Post There</div> : feedPost.map((item, index) => {
                    return <PostCard key={index} feed={item} />
                })
            }
        </div>

    )
}

export default Page