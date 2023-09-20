"use client"
import React from 'react'
import { BsThreeDotsVertical, AiFillCheckCircle } from '@/data/icons/icons'
import { Data } from '@/data/data/data'
import Link from 'next/link'
import Image from 'next/image'

const Menu = () => {
    return (
        <div className="absolute -right-60 top-7 bg-black text-white z-10 flex flex-col divide-y-2 divide-white rounded-lg">
            {
                Data.youtube.allVideos.menu.map((item, index) => {
                    return <div key={index} className='py-2 text-xs'>
                        {
                            item.map((item, index) => {
                                return <div key={index} className='hover:bg-gray-500 px-4 py-2 flex items-center gap-2'>
                                    <div className='text-xl'>
                                        {item.icon}
                                    </div>
                                    <div>
                                        {item.title}
                                    </div>
                                </div>
                            })
                        }
                    </div>
                })
            }
        </div>
    )
}

const Videos = ({ item }) => {
    const [toggleMenu, setToggleMenu] = React.useState(false)
    const [showMenu, setShowMenu] = React.useState(false)

    return (
        <div className='flex flex-col'>
            <div className='w-full h-[200px] rounded-lg relative'>
                <Image width={356.39} height={200} src={item.thumbnail} className='w-full h-full rounded-lg' />
                <span className="bg-black text-white text-xs px-2.5 py-0.5 rounded absolute bottom-2 right-2">
                    {item.duration}
                </span>
            </div>
            <div className='flex justify-center items-start gap-2 py-1 group relative pr-5' onMouseEnter={() => setShowMenu(true)} onMouseLeave={() => setShowMenu(false)}>
                <Image width={40} height={40} src={item.uploaderImage} className='w-10 h-10 rounded-full' />
                <div className='flex flex-col justify-start gap-1'>
                    <Link className='text-sm cursor-pointer' href={`/youtube/video/${item.id}`}>
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
                {
                    showMenu ? <BsThreeDotsVertical className='absolute top-2 right-0 cursor-pointer' onClick={() => setToggleMenu(!toggleMenu)} /> : null
                }
                {
                    toggleMenu ? <Menu /> : null
                }
            </div>
        </div>
    )
}

export default Videos