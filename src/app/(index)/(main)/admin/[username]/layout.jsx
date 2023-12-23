import React from 'react'
import ProfileTab from './components/client/ProfileTab'
import {
    Menubar,
    MenubarMenu,
} from "@/components/ui/menubar"
import { Button } from '@/components/ui/button'


const UsernameLayout = ({ children, params }) => {
    return (
        <section className='flex flex-col'>
            <div className='flex flex-col gap-4'>
                <ProfileTab username={params.username} />
                <Menubar className="p-0 mt-2 h-auto dark:bg-[#020817] border-0 space-x-2">
                    <MenubarMenu>
                        <Button className="p-4 text-base">Posts</Button>
                    </MenubarMenu>
                    <MenubarMenu>
                        <Button className="p-4 text-base">Profile</Button>
                    </MenubarMenu>
                    <MenubarMenu>
                        <Button className="p-4 text-base">Friends</Button>
                    </MenubarMenu>
                    <MenubarMenu>
                        <Button className="p-4 text-base">Videos</Button>
                    </MenubarMenu>
                </Menubar>
            </div>
            <div>
                {children}
            </div>
        </section>
    )
}

export default UsernameLayout