"use client"
import React from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { BiMenu } from "@/data/icons/icons";
import { Data } from '@/data/data/data'
import Link from 'next/link'
import { Context } from '@/context/Context'
import { AiFillPieChart } from '@/data/icons/icons'

const Sidebar = () => {
    const [showTopicAll, setShowTopicAll] = React.useState(false)

    const { isAuthenticated, isUserData, userData } = React.useContext(Context)

    return (
        <Sheet>
            <SheetTrigger asChild>
                <BiMenu className="text-2xl cursor-pointer" />
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col divide-y-2 divide-slate-500 scroll-smooth h-[93vh] overflow-y-scroll">
                    {
                        Object.entries(Data.sidebar).map(([key, value]) => {
                            return <ul className="space-y-1 py-2 first:pt-0 last:pb-0">
                                {
                                    key === 'recources' ? <Link href={isAuthenticated && isUserData ? `/admin/${userData?.username}` : '/'} className="flex items-center p-2 rounded-lg hover:bg-gray-300 group hover:text-gray-700">
                                        <AiFillPieChart />
                                        <span className="ml-3">
                                            Dashboard
                                        </span>
                                    </Link> : null
                                }
                                {
                                    value.slice(0, (key === 'topic' ? showTopicAll ? value.length : 7 : value.length)).map((item, index) => {
                                        return <Link href={item?.link} key={index} className="flex items-center p-2 rounded-lg hover:bg-gray-300 group hover:text-gray-700">
                                            {item.icon}
                                            <span className="ml-3">
                                                {item.title}
                                            </span>
                                        </Link>
                                    })
                                }
                                {
                                    key === 'topic' ? <Link href="#" onClick={() => setShowTopicAll(pre => !showTopicAll)} className="flex items-center p-2 rounded-lg hover:bg-gray-300 group hover:text-gray-700">
                                        {showTopicAll ? 'Show Less' : 'Show More'}
                                    </Link> : null
                                }
                            </ul>
                        })
                    }
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default Sidebar