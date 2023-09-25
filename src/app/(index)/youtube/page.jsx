import Videos from '@/app/(index)/youtube/components/server/Videos'
import { Data } from '@/data/data/data'
import React from 'react'

const Page = () => {
    return (
        <div className='grid grid-cols-5 gap-4 py-4 px-8'>
            {
                Data.youtube.allVideos.videos.map((item, index) => {
                    return <Videos item={item} key={index} />
                })
            }
        </div>
    )
}

export default Page