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
import ToltipButton from "@/app/(index)/components/client/ToltipButton";
import { Button } from "@/components/ui/button";

const Navbar = () => {
    const [toggleNavbar, setToggleNavbar] = React.useState(false)

    const { isAuthenticated, isUserData, userData } = React.useContext(Context)

    React.useEffect(() => {
        window.addEventListener("scroll", () => {
            document.documentElement.scrollTop !== 0 ? setToggleNavbar(pre => true) : setToggleNavbar(pre => false);
        });
    }, [])

    return (
        <nav className={`flex flex-wrap justify-between items-center px-5 p-2 w-full fixed top-0 z-50 ${toggleNavbar ? 'shadow-2xl' : 'shadow-none'} transition-all duration-300 ease-in-out`}>
            <aside className="flex items-center gap-3">
                <Sidebar />
                <span className="text-xl font-semibold cursor-pointer">ZTube</span>
            </aside>
            <div className="flex items-center justify-center rounded-full border-2 border-black dark:border-gray-100 bg-transparent w-[40rem]">
                <input type="text" placeholder="Search" className="rounded-l-full px-5 py-1 w-full focus:outline-none bg-transparent" />
                <div className="bg-transparent py-2 px-5 rounded-r-full cursor-pointer">
                    <BiSearch />
                </div>
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