import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from 'next/image'
import { Data } from '@/data/data/data'

const ReactionModal = ({ like }) => {
    return (
        <Dialog>
            <DialogTrigger>
                <div className='flex items-center justify-center gap-1'>
                    <Image src={'/svg/like.svg'} width={15} height={15} />
                    <Image src={'/svg/heart.svg'} width={15} height={15} className='-ml-2' />
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
                                    return <TabsTrigger className='flex items-center gap-1' key={index} value={item.id}>
                                        <Image src={item.icon} width={15} height={15} />
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
                                            <Image src="/image/user.png" alt="@shadcn" width={32} height={32} className='w-8 h-8' />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <span className='cursor-pointer'>Rahul Das</span>
                                    </div>
                                    <Image src={Data.emoji[0].icon} width={15} height={15} />
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

export default ReactionModal