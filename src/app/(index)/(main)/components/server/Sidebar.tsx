import React from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Link } from 'next-view-transitions'
import { UserType } from "@/context/AuthContext";
import Data from "@/data/data";
import { BiMenu } from "react-icons/bi";
import { AiFillPieChart } from "react-icons/ai";

interface Props {
    user: UserType | null
    showTopicAll: boolean
    setShowTopicAll: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar = ({ user, showTopicAll, setShowTopicAll }: Props) => {
    return user && <Sheet>
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
                        return <ul className={"space-y-1 py-2 first:pt-0 last:pb-0"} key={key}>
                            {
                                key === 'recources' ? <Link href={`/user/${user.username}`} className="flex items-center p-2 rounded-lg hover:bg-gray-300 group hover:text-gray-700">
                                    <AiFillPieChart />
                                    <span className="ml-3">
                                        Dashboard
                                    </span>
                                </Link> : null
                            }
                            {
                                value && value.slice(0, (key === 'topic' ? showTopicAll ? value.length : 7 : value.length)).map((item: {
                                    link: string
                                    icon: React.ReactNode
                                    title: string
                                }, index: number) => {
                                    return <Link href={item?.link} key={index} className="flex items-center p-2 rounded-lg hover:bg-gray-300 group hover:text-gray-700">
                                        {item.icon}
                                        <span className="ml-3">
                                            {item.title}
                                        </span>
                                    </Link>
                                })
                            }
                            {
                                key === 'topic' ? <Link href="#" onClick={() => setShowTopicAll(() => !showTopicAll)} className="flex items-center p-2 rounded-lg hover:bg-gray-300 group hover:text-gray-700">
                                    {showTopicAll ? 'Show Less' : 'Show More'}
                                </Link> : null
                            }
                        </ul>
                    })
                }
            </div>
        </SheetContent>
    </Sheet>
}

export default Sidebar