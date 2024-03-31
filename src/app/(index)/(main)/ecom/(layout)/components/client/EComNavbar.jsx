"use client"
import React from "react"
import Link from "next/link"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu"


const EComNavbar = () => {
    const components = [
        {
            title: "Men",
            link: '/ecom/products/?search=men',
            desc: 'Lorem',
        },
        {
            title: "Men",
            link: '/ecom/products/?search=men',
            desc: 'Lorem',
        },
        {
            title: "Men",
            link: '/ecom/products/?search=men',
            desc: 'Lorem',
        },
        {
            title: "Men",
            link: '/ecom/products/?search=men',
            desc: 'Lorem',
        },
        {
            title: "Men",
            link: '/ecom/products/?search=men',
            desc: 'Lorem',
        },
        {
            title: "Men",
            link: '/ecom/products/?search=men',
            desc: 'Lorem',
        },
        {
            title: "Men",
            link: '/ecom/products/?search=men',
            desc: 'Lorem',
        },
        {
            title: "Men",
            link: '/ecom/products/?search=men',
            desc: 'Lorem',
        },
        {
            title: "Men",
            link: '/ecom/products/?search=men',
            desc: 'Lorem',
        },
        {
            title: "Men",
            link: '/ecom/products/?search=men',
            desc: 'Lorem',
        },
        {
            title: "Men",
            link: '/ecom/products/?search=men',
            desc: 'Lorem',
        },
        {
            title: "Men",
            link: '/ecom/products/?search=men',
            desc: 'Lorem',
        },
    ]

    return <nav className={'bg-gray-200 dark:bg-accent mb-4'}>
        <NavigationMenu className={'max-w-none'}>
            <NavigationMenuList className={'gap-4 space-x-0'}>
                {
                    [1, 2, 3, 4, 5, 6, 7].map((item, index) => {
                        return <NavigationMenuItem key={index}>
                            <NavigationMenuTrigger className={'bg-transparent hover:bg-transparent data-[state=open]:bg-transparent'}>
                                Components
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="w-full grid grid-cols-6 grid-rows-4 p-4">
                                    {
                                        components.map((item, index) => {
                                            return <NavigationMenuLink asChild key={index}>
                                                <Link href={item.link} className={'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'}>
                                                    <div className="text-sm font-medium leading-none">
                                                        {item.title}
                                                    </div>
                                                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                        {item.desc}
                                                    </p>
                                                </Link>
                                            </NavigationMenuLink>
                                        })
                                    }
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    })
                }
            </NavigationMenuList>
        </NavigationMenu>
    </nav>
}

export default EComNavbar;