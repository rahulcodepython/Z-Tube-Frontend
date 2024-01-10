import React from 'react'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { BsThreeDots } from '@/data/icons/icons'
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import ReactionButton from './ReactionButton';
import ReplyModal from './ReplyModal';
import ReactionModal from './ReactionModal';
import Image from 'next/image';

const FeedComment = ({ index }) => {
    return (
        <div className={`flex items-center justify-between w-full ${index % 2 !== 0 ? 'pl-4' : null} relative`}>
            <div className='flex items-start gap-2'>
                <Avatar className="w-8 h-8">
                    <Image src="/image/user.png" width={32} height={32} />
                    <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                    <h4 className="text-sm font-semibold">@nextjs</h4>
                    <p className="text-xs">
                        The React Framework – created and maintained by @vercel.
                    </p>
                    <div className="flex items-center">
                        <span className="text-xs text-muted-foreground">
                            <Menubar className="w-full justify-between border-none p-0">
                                <ReactionButton type="reply" />
                                <MenubarMenu className="w-full">
                                    <MenubarTrigger className="flex justify-center items-center cursor-pointer">
                                        <ReplyModal />
                                    </MenubarTrigger>
                                </MenubarMenu>
                                <div>1h</div>
                            </Menubar>
                        </span>
                    </div>
                </div>
            </div>
            <Menubar className="border-none p-0">
                <MenubarMenu>
                    <MenubarTrigger className="p-1 rounded-full">
                        <BsThreeDots className='cursor-pointer' />
                    </MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>
                            Hide Comment
                        </MenubarItem>
                        <MenubarItem>
                            Block Someone
                        </MenubarItem>
                        <MenubarItem>
                            Report Comment
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
            <div className='absolute bottom-2 right-8'>
                <ReactionModal />
            </div>
        </div>
    )
}

export default FeedComment