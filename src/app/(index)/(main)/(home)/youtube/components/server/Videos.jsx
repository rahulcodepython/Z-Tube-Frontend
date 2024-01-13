import { AiFillCheckCircle } from '@/data/icons/icons'
import VideosMenu from '../client/VideosMenu'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import TimeParser from '@/utils/index'

const Videos = ({ item }) => {
    return (
        <div className='flex flex-col'>
            <div className='w-full h-[200px] rounded-lg relative'>
                <Image width={356.39} height={200} src={item.thumbnail} alt='Thumbnail' className='w-full h-full rounded-lg' />
                <span className="bg-black text-white text-xs px-2.5 py-0.5 rounded absolute bottom-2 right-2">
                    {TimeParser(item.duration)}
                </span>
            </div>
            <div className='flex justify-center items-start gap-2 py-1 relative pr-5'>
                <Image width={40} height={40} src={item.uploaderImage} alt='User Image' className='w-10 h-10 rounded-full' />
                <div className='flex flex-col justify-start gap-1'>
                    <Link className='text-sm cursor-pointer' href={`/youtube/${item.id}`}>
                        {item.title}
                    </Link>
                    <div className='text-xs flex gap-1 items-center'>
                        <span className='cursor-pointer'>
                            {item.uploaderName}
                        </span>
                        <AiFillCheckCircle />
                    </div>
                    <div className='flex items-center justify-start gap-2 text-xs'>
                        <div>{item.views} views</div>
                        <div>{item.time}</div>
                    </div>
                </div>
                <div className='absolute top-2 right-0 cursor-pointer'>
                    <VideosMenu />
                </div>
            </div>
        </div>
    )
}

export default Videos