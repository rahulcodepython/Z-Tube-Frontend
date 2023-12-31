"use client"
import { BiSearch, BiBell } from "@/data/icons/icons";
import React from 'react'
import CreatePost from "./CreatePost";
import { ThemeToggle } from "./ThemeToggle";
import { Context } from '@/context/Context'
import Link from 'next/link'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import Sidebar from "./Sidebar";
import ToltipButton from "@/app/(index)/components/server/ToltipButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navbar = () => {
    const [toggleNavbar, setToggleNavbar] = React.useState(false)

    const { isAuthenticated, isUserData, userData } = React.useContext(Context)

    React.useEffect(() => {
        window.addEventListener("scroll", () => {
            document.documentElement.scrollTop !== 0 ? setToggleNavbar(pre => true) : setToggleNavbar(pre => false);
        });
    }, [])

    return (
        <nav className={`bg-white dark:bg-black flex flex-wrap justify-between items-center px-5 p-2 w-full fixed top-0 z-50 ${toggleNavbar ? 'shadow-2xl dark:shadow-white/30' : 'shadow-none'} transition-all duration-300 ease-in-out`}>
            <aside className="flex items-center gap-3">
                <Sidebar />
                <span className="text-xl font-semibold cursor-pointer">ZTube</span>
            </aside>
            <div className="flex items-center justify-center w-[40rem]">
                <Input type="text" placeholder="Search" className="px-5 py-1 rounded-l-full focus:ring-0 focus-visible:ring-0" />
                <Button variant="outline" className="rounded-l-none rounded-r-full">
                    <BiSearch />
                </Button>
            </div>
            <div className="flex gap-4 items-center">
                <CreatePost />
                <ToltipButton title={<BiBell />} desc={`Notifications`} />
                <ThemeToggle />
                {
                    isAuthenticated && isUserData ?
                        <Link href={`/admin/${encodeURIComponent(userData?.username)}`}>
                            <Avatar>
                                <AvatarImage src={userData.image ? userData.image : '/image/user.png'} width={50} height={20} alt='...' />
                                <AvatarFallback>User</AvatarFallback>
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