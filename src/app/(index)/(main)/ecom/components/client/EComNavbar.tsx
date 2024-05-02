"use client"
import React from 'react'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Link } from 'next-view-transitions'
import Data from "@/data/data";

const EComNavbar = () => {
    return (
        <nav className={'bg-gray-200 dark:bg-accent'}>
            <NavigationMenu className={'max-w-none py-[0.6rem]'}>
                <NavigationMenuList className={'gap-4 space-x-0'}>
                    {
                        Data.ecom.navbarItems.map((item, index) => {
                            return <NavigationMenuItem key={index}>
                                <Link href={item.link}>
                                    <NavigationMenuLink className="hover:bg-background p-2 rounded-md">
                                        {item.title}
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        })
                    }
                </NavigationMenuList>
            </NavigationMenu>
        </nav>
    )
}

export default EComNavbar