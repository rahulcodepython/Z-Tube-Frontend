import React from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { BsThreeDots } from '@/data/icons/icons'
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Separator } from "@/components/ui/separator"
import Image from 'next/image';
import Reaction from '../client/Reaction'
import Comment from './Comment'
import Share from './Share'
import ReactionModal from './ReactionModal'

const PostCard = ({ post }) => {
    return (
        <Card>
            <CardHeader className="px-2 py-3">
                <CardTitle className="flex flex-col space-y-2">
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center space-x-4'>
                            <Image src={'/image/user.png'} width={36} height={36} className="h-9 w-9 rounded-full" />
                            <div className="leading-3">
                                <div className='text-sm leading-3'>Rahul Das</div>
                                <div className='text-xs'>{(post.createdAt)}</div>
                            </div>
                        </div>
                        <Menubar className="border-none p-0">
                            <MenubarMenu>
                                <MenubarTrigger className="p-2 rounded-full">
                                    <BsThreeDots className='cursor-pointer' />
                                </MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem>Save Post</MenubarItem>
                                    {post.self ? <MenubarItem>Edit Post</MenubarItem> : null}
                                    <MenubarSeparator />
                                    <MenubarItem>Hide Post</MenubarItem>
                                    <MenubarItem>Hide From Someone</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Block Someone</MenubarItem>
                                    <MenubarItem>Report Post</MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                        </Menubar>
                    </div>
                    <div className='text-sm'>
                        {post.caption}
                    </div>
                    <div className='text-xs flex items-center gap-2'>
                        {
                            post.tags.map((item, index) => {
                                <span key={index}>#{item}</span>
                            })
                        }
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <AspectRatio ratio={1 / 1} className='flex items-center justify-center'>
                    {
                        post.media.map((item, index) => {
                            return JSON.parse(item).type.includes("image/") ? <Image src={JSON.parse(item).url} width={250} height={250} alt="Image" style={{
                                "width": "auto",
                                "height": "auto"
                            }} key={index} /> : null
                        })
                    }
                </AspectRatio>
            </CardContent>
            <CardFooter className="px-2 pt-1 pb-0 flex flex-col">
                <div className='flex items-center justify-between w-full'>
                    <ReactionModal like={post.likeNo} />
                    <div className='flex items-center justify-center gap-2 text-xs'>
                        <span>
                            {post.viewsNo} Views
                        </span>
                        <span>
                            {post.commentNo} Comments
                        </span>
                        <span>
                            {post.share} Shares
                        </span>
                    </div>
                </div>
                <Separator className="mt-1" />
                <Menubar className="w-full justify-between border-none p-0">
                    <Reaction type="post" />
                    <Comment post={post} />
                    <Share />
                </Menubar>
            </CardFooter>
        </Card>
    )
}

export default PostCard