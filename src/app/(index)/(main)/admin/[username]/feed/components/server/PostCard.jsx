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

const PostCard = () => {
    return (
        <Card>
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
                        <Menubar className="border-none p-0">
                            <MenubarMenu>
                                <MenubarTrigger className="p-2 rounded-full">
                                    <BsThreeDots className='cursor-pointer' />
                                </MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem>Save Post</MenubarItem>
                                    <MenubarItem>Edit Post</MenubarItem>
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
                    <div className='text-sm'>This is the caption for it</div>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <AspectRatio ratio={1 / 1} className='flex items-center justify-center'>
                    <Image src="/image/image.png" width={250} height={250} alt="Image" className="" />
                </AspectRatio>
            </CardContent>
            <CardFooter className="px-2 pt-1 pb-0 flex flex-col">
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
                    <Reaction type="post" />
                    <Comment />
                    <Share />
                </Menubar>
            </CardFooter>
        </Card>
    )
}

export default PostCard