import { Data } from '@/data/data/data'
import React from 'react'
import Videos from './components/server/Videos'

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