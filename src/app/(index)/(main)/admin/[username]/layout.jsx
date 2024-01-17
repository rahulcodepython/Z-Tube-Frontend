"use client"
import React from 'react'
import {
    Menubar,
    MenubarMenu,
} from "@/components/ui/menubar"
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Layout = ({ children, params, profile }) => {
    return (
        <div className='my-4 mx-auto container'>
            <section className='space-y-4'>
                <div className='space-y-4'>
                    {profile}
                    <Menubar className="p-0 mt-2 h-auto border-none shadow-none space-x-2">
                        <MenubarMenu>
                            <Link href={`/admin/${params.username}/`}>
                                <Button>Profile</Button>
                            </Link>
                        </MenubarMenu>
                        <MenubarMenu>
                            <Link href={'#'}>
                                <Button>Friends</Button>
                            </Link>
                        </MenubarMenu>
                        <MenubarMenu>
                            <Link href={`/admin/${params.username}/feed/`}>
                                <Button>Feed</Button>
                            </Link>
                        </MenubarMenu>
                    </Menubar>
                </div>
                <div>
                    {children}
                </div>
            </section>
        </div>
    )
}

export default Layout