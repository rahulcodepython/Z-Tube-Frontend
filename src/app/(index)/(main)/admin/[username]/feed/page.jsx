"use client"
import React from 'react'
import PostCardSkeleton from './components/server/PostCardSkeleton'
import PostCard from './components/server/PostCard'

const Page = () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        setTimeout(() => {
            setLoading(pre => true)
        }, 5000);
    }, [])


    return (
        !loading ? <PostCardSkeleton /> : <div className='grid grid-cols-3 gap-4'>
            {
                numbers.map((item, index) => {
                    return <PostCard key={index} />
                })
            }
        </div>

    )
}

export default Page