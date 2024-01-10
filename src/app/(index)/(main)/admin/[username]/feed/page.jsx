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
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Separator } from "@/components/ui/separator"
import Image from 'next/image';
import ReactionButton from './components/server/ReactionButton'
import Comments from './components/server/Comments'
import ShareModal from './components/server/ShareModal'
import ReactionModal from './components/server/ReactionModal'
import PostMenu from './components/server/PostMenu'

const Page = () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <div className='grid grid-cols-3 gap-4'>
            {
                numbers.map((item, index) => {
                    return (
                        <Card key={index}>
                            <CardHeader className="px-2 py-3">
                                <CardTitle className="flex flex-col space-y-2">
                                    <div className='flex justify-between items-center'>
                                        <div className='flex items-center space-x-4'>
                                            <Image src={'/image/user.png'} width={36} height={36} className="h-9 w-9 rounded-full" />
                                            <div className="leading-3">
                                                <div className='text-sm leading-3'>Rahul Das</div>
                                                <div className='text-xs'>21 December 2023 at 17:26</div>
                                            </div>
                                        </div>
                                        <PostMenu />
                                    </div>
                                    <div className='text-sm'>This is the caption for it</div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <AspectRatio ratio={1 / 1} className='flex items-center justify-center'>
                                    <Image src="/image/image.png" width={250} height={250} alt="Image" className="" />
                                </AspectRatio>
                            </CardContent>
                            <CardFooter className="px-2 py-1 flex flex-col">
                                <div className='flex items-center justify-between w-full'>
                                    <ReactionModal />
                                    <div className='flex items-center justify-center gap-2 text-xs'>
                                        <span>
                                            2k Comments
                                        </span>
                                        <span>
                                            2k Shares
                                        </span>
                                    </div>
                                </div>
                                <Separator className="mt-1" />
                                <Menubar className="w-full justify-between border-none p-0">
                                    <ReactionButton type="post" />
                                    <MenubarMenu className="w-full">
                                        <MenubarTrigger className="w-1/3 flex justify-center items-center cursor-pointer">
                                            <Comments />
                                        </MenubarTrigger>
                                    </MenubarMenu>
                                    <ShareModal />
                                </Menubar>
                            </CardFooter>
                        </Card>
                    )
                })
            }
        </div>

    )
}

export default Page