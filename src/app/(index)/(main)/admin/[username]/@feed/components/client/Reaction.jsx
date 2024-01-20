"use client"
import React from 'react'
import {
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"
import Image from 'next/image';
import { AiOutlineLike, MdDoNotDisturb } from '@/data/icons/icons'
import { Data } from '@/data/data/data';

const Reaction = ({ type }) => {
    const [reaction, setReaction] = React.useState(null)

    return (
        <MenubarMenu className="w-full">
            <MenubarTrigger className={`${type === 'reply' ? '' : 'w-1/3'} flex justify-center items-center cursor-pointer`}>
                {
                    reaction === null ? <div className='flex items-center gap-1'>
                        <AiOutlineLike className='text-lg' />
                        <span className='text-xs'>Like</span>
                    </div> : <div className='flex justify-center items-center gap-1 cursor-pointer'>
                        <Image src={Data.emoji[reaction].icon} width={15} height={15} />
                        <span className='text-xs'>{Data.emoji[reaction].name}</span>
                    </div>
                }
            </MenubarTrigger>
            <MenubarContent className="flex items-center gap-2 rounded-full p-2">
                {
                    Data.emoji.map((item, index) => {
                        return <MenubarItem key={index} className='flex items-center cursor-pointer p-0 hover:-translate-y-2 transition-all duration-100 ease-in-out' onClick={() => { setReaction(pre => index) }}>
                            <Image src={item.icon} width={30} height={30} />
                        </MenubarItem>
                    })
                }
                <MenubarItem className='flex items-center cursor-pointer p-0 hover:-translate-y-2 transition-all duration-100 ease-in-out' onClick={() => { setReaction(pre => null) }}>
                    <MdDoNotDisturb className='text-3xl' />
                </MenubarItem>
            </MenubarContent>
        </MenubarMenu>
    )
}

export default Reaction