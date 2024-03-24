"use client"
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
    MenubarTrigger,
} from "@/components/ui/menubar"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {
    Dialog,
    DialogContent, DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {BsThreeDots, IoChatbubbleOutline} from '@/data/icons/icons'
import {AspectRatio} from "@/components/ui/aspect-ratio"
import {Separator} from "@/components/ui/separator"
import Image from 'next/image';
import PostReactionModal from './PostReactionModal'
import Comment from './Comment'
import Share from '../server/Share'
import PostReactionDetails from '../server/PostReactionDetails'
import EditFeed from "@/app/(index)/(main)/user/[username]/@feed/components/client/EditFeed";

const PostCard = ({feed}) => {
    const [post, setPost] = React.useState(feed)
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <Card className="space-y-3 py-3">
            <CardHeader className="px-2 mt-0 py-0">
                <CardTitle className="flex flex-col space-y-2">
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center space-x-4'>
                            <Image src={post.uploader.image ? post.uploader.image : '/image/user.png'} width={36}
                                   height={36} className="h-9 w-9 rounded-full" alt={'default'}/>
                            <div className="leading-3">
                                <div className='text-sm leading-3'>{post.uploader.name}</div>
                                <div className='text-xs'>{(post.createdAt)}</div>
                            </div>
                        </div>
                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <Menubar className="border-none p-0 shadow-none">
                                <MenubarMenu>
                                    <MenubarTrigger className="p-2 rounded-full">
                                        <BsThreeDots className='cursor-pointer'/>
                                    </MenubarTrigger>
                                    <MenubarContent>
                                        <MenubarItem>Save Post</MenubarItem>
                                        {post.self ? <MenubarItem className={'cursor-pointer'}>
                                            <DialogTrigger className={'w-full flex'}>
                                                Edit Post
                                            </DialogTrigger>
                                        </MenubarItem> : null}
                                    </MenubarContent>
                                </MenubarMenu>
                            </Menubar>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        <p>Edit Feed</p>
                                    </DialogTitle>
                                    <DialogDescription>
                                        <EditFeed setIsOpen={setIsOpen} post={post} setPost={setPost} />
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className='text-sm'>
                        {post.caption}
                    </div>
                    <div className='text-xs flex items-center gap-2'>
                        {
                            post.tags.map((item, index) => {
                                return <span key={index}>#{item}</span>
                            })
                        }
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className={`px-20`}>
                {
                    post.media.length > 1 ? <Carousel>
                            <CarouselContent>
                                {
                                    post.media.map((item, index) => {
                                        return <CarouselItem key={index}>
                                            <AspectRatio ratio={16 / 9} className={'flex items-center justify-center'}>
                                                <Image src={item} width={250} height={250} alt="Image"
                                                       className='object-cover'/>
                                            </AspectRatio>
                                        </CarouselItem>
                                    })
                                }
                            </CarouselContent>
                            <CarouselPrevious/>
                            <CarouselNext/>
                        </Carousel>
                        : <AspectRatio ratio={16 / 9} className={'flex items-center justify-center'}>
                            {
                                post.media.map((item, index) => {
                                    return <Image src={item} width={250} height={250} alt="Image" className='object-cover'
                                                  key={index}/>
                                })
                            }
                        </AspectRatio>
                }
            </CardContent>
            <CardFooter className="px-2 pt-1 pb-0 flex flex-col">
                <div className='flex items-center justify-between w-full'>
                    <PostReactionDetails like={post.likeNo}/>
                    <div className='flex items-center justify-center gap-2 text-xs'>
                        <span>
                            {post.viewsNo} Views
                        </span>
                        {
                            post.allowComments && <span>
                                {post.commentNo} Comments
                            </span>
                        }
                        <span>
                            {post.share} Shares
                        </span>
                    </div>
                </div>
                <Separator className="mt-1"/>
                <div className='grid grid-cols-3 gap-2 w-full'>
                    <PostReactionModal post={post} setPost={setPost}/>
                    {
                        post.allowComments ? <Dialog>
                            <DialogTrigger>
                                <div className='flex justify-center items-center gap-1 text-xs'>
                                    <IoChatbubbleOutline className='text-lg'/>
                                    <span>Comments</span>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="max-w-5xl w-[600px]">
                                <DialogHeader>
                                    <DialogTitle>{post.commentNo} Comment</DialogTitle>
                                    <Comment post={post} setPost={setPost}/>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog> : <div></div>
                    }
                    <Share/>
                </div>
            </CardFooter>
        </Card>
    )
}

export default PostCard