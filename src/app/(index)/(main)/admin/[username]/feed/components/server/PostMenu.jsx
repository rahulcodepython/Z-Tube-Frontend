import React from 'react'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { BsThreeDots } from '@/data/icons/icons'

const PostMenu = () => {
    return (
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

    )
}

export default PostMenu