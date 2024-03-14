"use client"
import React from 'react'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"
import Image from 'next/image';
import { AiOutlineLike, MdDoNotDisturb } from '@/data/icons/icons'
import { Data } from '@/data/data/data';
import { AuthContext } from '@/context/AuthContext';
import axios from "axios";

const PostReactionModal = ({ post, setPost }) => {
    const [reaction, setReaction] = React.useState(post.user_reaction ? Data.emoji.find(item => item.name.toLowerCase() === post.user_reaction.toLowerCase())?.id || null : null)

    const { accessToken } = React.useContext(AuthContext)

    return (
        <Menubar className="justify-center border-none p-0">
            <MenubarMenu>
                <MenubarTrigger className={`flex justify-center items-center cursor-pointer focus:bg-transparent data-[state=open]:bg-transparent`}>
                    {
                        reaction === null ? <div className='flex items-center gap-1'>
                            <AiOutlineLike className='text-lg' />
                            <span className='text-xs'>Like</span>
                        </div> : <div className='flex justify-center items-center gap-1 cursor-pointer'>
                            <Image src={Data.emoji[reaction]?.icon} width={15} height={15} alt={''} />
                            <span className='text-xs'>{Data.emoji[reaction]?.name}</span>
                        </div>
                    }
                </MenubarTrigger>
                <MenubarContent className="flex items-center gap-2 rounded-full p-2">
                    {
                        Data.emoji.map((item, index) => {
                            return <MenubarItem key={index} className='flex items-center cursor-pointer p-0 hover:-translate-y-2 transition-all duration-100 ease-in-out' onClick={() => {
                                ReactOnPost(accessToken, post, setPost, item.name, setReaction, index).then(() => null )
                            }}>
                                <Image src={item.icon} width={30} height={30} alt={''} />
                            </MenubarItem>
                        })
                    }
                    <MenubarItem className='flex items-center cursor-pointer p-0 hover:-translate-y-2 transition-all duration-100 ease-in-out' onClick={() => {
                        RemoveReactOnPost(accessToken, post, setPost, Data.emoji[reaction].name, setReaction).then(() => null)
                    }}>
                        <MdDoNotDisturb className='text-3xl' />
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
}

const ReactOnPost = async (accessToken, post, setPost, reaction, setReaction, index) => {
    const options = {
        method: 'POST',
        url: `${process.env.BASE_API_URL}/feed/postreaction/${post.id}/${reaction.toLowerCase()}/`,
        headers: {
            Authorization: `JWT ${accessToken}`
        }
    };

    await axios.request(options)
        .then(response => {
            setPost({ ...post, likeNo: response.data.likeNo });
            setReaction(() => index)
        })
}

const RemoveReactOnPost = async (accessToken, post, setPost, reaction, setReaction) => {
    const options = {
        method: 'DELETE',
        url: `${process.env.BASE_API_URL}/feed/postreaction/${post.id}/${reaction.toLowerCase()}/`,
        headers: {
            Authorization: `JWT ${accessToken}`
        }
    };

    await axios.request(options)
        .then(response => {
            setPost({ ...post, likeNo: response.data.likeNo });
            setReaction(() => null)
        })
}


export default PostReactionModal