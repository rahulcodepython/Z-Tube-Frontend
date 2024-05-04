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
import {AspectRatio} from "@/components/ui/aspect-ratio"
import {Separator} from "@/components/ui/separator"
import Image from 'next/image';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {AccessToken, AuthContext, AuthContextType, ProfileType} from '@/context/AuthContext';
import axios from "axios";
import {FeedContext, FeedContextType, FeedType} from '@/context/FeedContext'
import {BsThreeDots} from "react-icons/bs";
import {IoChatbubbleOutline} from "react-icons/io5";
import Data from "@/data/data";
import {AiOutlineLike} from "react-icons/ai";
import {MdDoNotDisturb} from "react-icons/md";
import {RiShareForwardLine} from "react-icons/ri";
import EditFeed from "@/app/(index)/(main)/user/[username]/@feed/components/client/EditFeed";
import Comment from "@/app/(index)/(main)/user/[username]/@feed/components/client/Comment";

const PostCard = ({feed, feedIndex}: { feed: FeedType, feedIndex: number }) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false)

    const authContext = React.useContext<AuthContextType | undefined>(AuthContext)
    const accessToken = authContext?.accessToken
    const setProfile = authContext?.setProfile
    const feedContext = React.useContext<FeedContextType | undefined>(FeedContext)
    const setFeed = feedContext?.setFeed

    return (
        <Card className="pt-3 rounded-md">
            <CardHeader className="px-2 mt-0 py-0">
                <CardTitle className="flex flex-col gap-3">
                    <div className='flex justify-between items-center mx-2'>
                        <div className='flex items-center space-x-4'>
                            <Image src={feed.uploader.image ? feed.uploader.image : '/image/user.png'} width={36}
                                   height={36} className="h-9 w-9 rounded-full" alt={'default'}/>
                            <div className="flex flex-col gap-1">
                                <div
                                    className='text-sm leading-3'>{feed.uploader.first_name} {feed.uploader.last_name}</div>
                                <div className='text-xs'>{feed.createdAt}</div>
                            </div>
                        </div>
                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <Menubar className="border-none p-0 shadow-none">
                                <MenubarMenu>
                                    <MenubarTrigger className="p-2 rounded-full">
                                        <BsThreeDots className='cursor-pointer'/>
                                    </MenubarTrigger>
                                    <MenubarContent>
                                        {
                                            feed.self && <MenubarItem className={'cursor-pointer'}>
                                                <DialogTrigger className={'w-full flex'}>
                                                    Edit Post
                                                </DialogTrigger>
                                            </MenubarItem>
                                        }
                                        {
                                            feed.self && <MenubarItem className="cursor-pointer"
                                                                      onClick={() => DeleteFeed(accessToken, feed, feedIndex, setFeed, setProfile)}>
                                                Delete Post
                                            </MenubarItem>
                                        }
                                    </MenubarContent>
                                </MenubarMenu>
                            </Menubar>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        <p>Edit Feed</p>
                                    </DialogTitle>
                                    <DialogDescription>
                                        <EditFeed setIsOpen={setIsOpen} feed={feed} feedIndex={feedIndex}/>
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className='text-sm mx-2'>
                        {feed.caption}
                    </div>
                    <div className='text-xs flex items-center gap-2 mx-2'>
                        {
                            feed.tags.map((item, index) => {
                                return <span key={index}>#{item}</span>
                            })
                        }
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 my-3">
                {
                    feed.media.length > 1 ? <Carousel>
                            <CarouselContent>
                                {
                                    feed.media.map((item, index) => {
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
                                feed.media.map((item, index) => {
                                    return <Image src={item} width={250} height={250} alt="Image" className='object-cover'
                                                  key={index}/>
                                })
                            }
                        </AspectRatio>
                }
            </CardContent>
            <CardFooter className="px-2 py-1 flex flex-col">
                <div className='flex items-center justify-between w-full pb-1'>
                    <AllReactions like={feed.likeNo}/>
                    <div className='flex items-center justify-center gap-2 text-xs'>
                        <span>
                            {feed.viewsNo} Views
                        </span>
                        {
                            feed.allowComments && <span>
                                {feed.commentNo} Comments
                            </span>
                        }
                        <span>
                            {feed.share} Shares
                        </span>
                    </div>
                </div>
                <Separator className="mt-1"/>
                <div className='grid grid-cols-3 gap-2 w-full pt-1'>
                    <Reaction feed={feed} feedIndex={feedIndex}/>
                    {
                        feed.allowComments ? <Dialog>
                            <DialogTrigger>
                                <div className='flex justify-center items-center gap-1 text-xs'>
                                    <IoChatbubbleOutline className='text-lg'/>
                                    <span>Comments</span>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="max-w-5xl w-[600px]">
                                <DialogHeader>
                                    <DialogTitle>{feed.commentNo} Comment</DialogTitle>
                                    <Comment feed={feed} feedIndex={feedIndex}/>
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

const AllReactions = ({like}: { like: number }) => {
    return (
        <Dialog>
            <DialogTrigger>
                <div className='flex items-center justify-center gap-1'>
                    <Image src={'/svg/like.svg'} width={15} height={15} alt={''}/>
                    <Image src={'/svg/heart.svg'} width={15} height={15} className='-ml-2' alt={''}/>
                    <span className='text-sm'>{like}</span>
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-2xl w-[672px]">
                <DialogDescription>
                    <Tabs defaultValue="all" className="w-full pt-5">
                        <TabsList className="w-full">
                            <TabsTrigger value="all">All</TabsTrigger>
                            {
                                Data.emoji.map((item, index) => {
                                    return <TabsTrigger className='flex items-center gap-1' key={index}
                                                        value={`${item.id}`}>
                                        <Image src={item.icon} width={15} height={15} alt={''}/>
                                        <span>{item.name}</span>
                                    </TabsTrigger>
                                })
                            }
                        </TabsList>
                        <TabsContent value="all" className="mt-4">
                            <ul>
                                <li className='flex items-center justify-between'>
                                    <div className='flex items-center gap-2'>
                                        <Avatar className="w-8 h-8">
                                            <Image src="/image/user.png" alt="@shadcn" width={32} height={32}
                                                   className='w-8 h-8'/>
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <span className='cursor-pointer'>Rahul Das</span>
                                    </div>
                                    <Image src={Data.emoji[0].icon} width={15} height={15} alt={''}/>
                                </li>
                            </ul>
                        </TabsContent>
                        <TabsContent value="0">Change your password here.</TabsContent>
                        <TabsContent value="1">Change your password here.</TabsContent>
                        <TabsContent value="2">Change your password here.</TabsContent>
                        <TabsContent value="3">Change your password here.</TabsContent>
                        <TabsContent value="4">Change your password here.</TabsContent>
                        <TabsContent value="5">Change your password here.</TabsContent>
                        <TabsContent value="6">Change your password here.</TabsContent>
                    </Tabs>
                </DialogDescription>
            </DialogContent>
        </Dialog>

    )
}

const Reaction = ({feed, feedIndex}: { feed: FeedType, feedIndex: number }) => {
    const [reaction, setReaction] = React.useState<number | null>(feed.user_reaction && Data.emoji.find(item => item.name.toLowerCase() === feed?.user_reaction?.toLowerCase())?.id || null)

    const authContext = React.useContext<AuthContextType | undefined>(AuthContext)
    // const { accessToken } = React.useContext(AuthContext)
    const accessToken = authContext?.accessToken
    const feedContext = React.useContext<FeedContextType | undefined>(FeedContext)
    const setFeed = feedContext?.setFeed
    // const { setFeed } = React.useContext(FeedContext)

    return (
        <Menubar className="justify-center border-none p-0">
            <MenubarMenu>
                <MenubarTrigger
                    className={`flex justify-center items-center cursor-pointer focus:bg-transparent data-[state=open]:bg-transparent`}>
                    {
                        reaction === null ? <div className='flex items-center gap-1'>
                            <AiOutlineLike className='text-lg'/>
                            <span className='text-xs'>Like</span>
                        </div> : <div className='flex justify-center items-center gap-1 cursor-pointer'>
                            <Image src={Data.emoji[reaction]?.icon} width={15} height={15} alt={''}/>
                            <span className='text-xs'>{Data.emoji[reaction]?.name}</span>
                        </div>
                    }
                </MenubarTrigger>
                <MenubarContent className="flex items-center gap-2 rounded-full p-2">
                    {
                        Data.emoji.map((item, index) => {
                            return <MenubarItem key={index}
                                                className='flex items-center cursor-pointer p-0 hover:-translate-y-2 transition-all duration-100 ease-in-out'
                                                onClick={() => {
                                                    ReactOnPost(accessToken, feed, feedIndex, item.name, setReaction, index, setFeed)
                                                }}>
                                <Image src={item.icon} width={30} height={30} alt={''}/>
                            </MenubarItem>
                        })
                    }
                    <MenubarItem
                        className='flex items-center cursor-pointer p-0 hover:-translate-y-2 transition-all duration-100 ease-in-out'
                        onClick={() => {
                            reaction && RemoveReactOnPost(accessToken, feed, feedIndex, Data.emoji[reaction].name, setReaction, setFeed)
                        }}>
                        <MdDoNotDisturb className='text-3xl'/>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
}

const ReactOnPost = async (
    accessToken: AccessToken | undefined,
    feed: FeedType | undefined,
    feedIndex: number,
    reaction: string,
    setReaction: (value: (((prevState: (number | null)) => (number | null)) | number | null)) => void,
    index: number,
    setFeed: ((value: (((prevState: Array<FeedType>) => Array<FeedType>) | Array<FeedType>)) => void) | undefined
) => {
    const options = {
        method: 'POST',
        url: `${process.env.BASE_API_URL}/feed/postreaction/${feed?.id}/${reaction.toLowerCase()}/`,
        headers: {
            Authorization: `JWT ${accessToken}`
        }
    };

    await axios.request(options)
        .then(response => {
            setFeed && setFeed(pre => {
                if (pre) {
                    let newData: Array<FeedType> | [] = [...pre];
                    newData[feedIndex].likeNo = response.data.likeNo;
                    return newData;
                }else{
                    return []
                }
            })
            setReaction(() => index)
        })
}

const RemoveReactOnPost = async (
    accessToken: AccessToken | undefined,
    feed: FeedType | undefined,
    feedIndex: number,
    reaction: string,
    setReaction: React.Dispatch<React.SetStateAction<number | null>>,
    setFeed: ((value: (((prevState: Array<FeedType>) => Array<FeedType>) | Array<FeedType>)) => void) | undefined
) => {
    const options = {
        method: 'DELETE',
        url: `${process.env.BASE_API_URL}/feed/postreaction/${feed?.id}/${reaction.toLowerCase()}/`,
        headers: {
            Authorization: `JWT ${accessToken}`
        }
    };

    await axios.request(options)
        .then(response => {
            setFeed && setFeed(pre => {
                let newData = [...pre];
                newData[feedIndex] = response.data.likeNo;
                return newData;
            })
            setReaction(() => null)
        })
}

const DeleteFeed = async (
    accessToken: AccessToken | undefined,
    feed: FeedType | undefined,
    feedIndex: number,
    setFeed: ((value: (((prevState: Array<FeedType>) => Array<FeedType>) | Array<FeedType>)) => void) | undefined,
    setProfile: ((value: (((prevState: (ProfileType | null)) => (ProfileType | null)) | ProfileType | null)) => void) | undefined
) => {
    const options = {
        method: 'DELETE',
        url: `${process.env.BASE_API_URL}/feed/editpost/${feed?.id}/`,
        headers: {
            Authorization: `JWT ${accessToken}`
        }
    };
    await axios.request(options)
        .then(response => {
            setFeed && setFeed(pre => {
                return pre.filter((item, index) => index !== feedIndex)
            })
            setProfile && setProfile(pre => {
                if (pre) {
                    return {
                        ...pre,
                        posts: response.data.posts
                    }
                } else {
                    return null
                }
            })
        })
}

const Share = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <div className='flex justify-center items-center gap-1'>
                    <RiShareForwardLine className='text-lg'/>
                    <span className='text-xs'>Share</span>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default PostCard