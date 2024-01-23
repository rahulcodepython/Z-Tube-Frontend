import { BiSearch, BiBell } from "@/data/icons/icons";
import React from 'react'
import CreatePost from "../client/CreatePost";
import { ThemeToggle } from "../client/ThemeToggle";
import Link from 'next/link'
import { Avatar } from "@/components/ui/avatar"
import Sidebar from "./Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const Navbar = ({ isUserData, userData, toggleNavbar, showTopicAll, setShowTopicAll }) => {
    return (
        <nav className={`bg-white dark:bg-background flex flex-wrap justify-between items-center px-5 p-2 w-full fixed top-0 z-50 ${toggleNavbar ? 'shadow-2xl dark:shadow-white/5' : 'shadow-none'} transition-all duration-300 ease-in-out`}>
            <aside className="flex items-center gap-3">
                <Sidebar isUserData={isUserData} userData={userData} showTopicAll={showTopicAll} setShowTopicAll={setShowTopicAll} />
                <span className="text-xl font-semibold cursor-pointer">ZTube</span>
            </aside>
            <div className="flex items-center justify-center w-[40rem]">
                <Input type="text" placeholder="Search" className="px-5 py-1 rounded-l-full border-r-0 focus:ring-0 focus-visible:ring-0" />
                <Button variant="outline" className="rounded-l-none rounded-r-full">
                    <BiSearch />
                </Button>
            </div>
            <div className="flex gap-4 items-center">
                <CreatePost />
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <span className="text-xl cursor-pointer">
                                <BiBell />
                            </span>
                        </TooltipTrigger>
                        <TooltipContent>
                            Notifications
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <ThemeToggle />
                {
                    isUserData ?
                        <Link href={`/admin/${encodeURIComponent(userData?.username)}`}>
                            <Avatar className="w-8 h-8">
                                <Image src={userData.image ? userData.image : '/image/user.png'} width={32} height={32} alt='...' />
                            </Avatar>
                        </Link> :
                        <Link href={'/auth/login'}>
                            <Button>
                                Login
                            </Button>
                        </Link>
                }
            </div>
        </nav>
    )
}

export default Navbar