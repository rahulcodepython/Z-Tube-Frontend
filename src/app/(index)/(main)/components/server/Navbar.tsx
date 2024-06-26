import { BiSearch, BiBell } from 'react-icons/bi';
import React from 'react'
import { Link } from 'next-view-transitions'
import { Avatar } from "@/components/ui/avatar"
import Sidebar from "@/app/(index)/(main)/components/server/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ThemeToggle } from "@/app/(index)/(main)/components/server/ThemeToggle";
import { UserType } from "@/context/AuthContext";
import CustomTooltip from "@/components/ToolTip";

interface Props {
    user: UserType | null | undefined
    toggleNavbar: boolean
    showTopicAll: boolean
    setShowTopicAll: React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar = ({ user, toggleNavbar, showTopicAll, setShowTopicAll }: Props) => {
    return user && <nav className={`bg-white dark:bg-background flex flex-wrap justify-between items-center px-5 p-2 w-full fixed top-0 z-50 ${toggleNavbar ? 'shadow-2xl dark:shadow-white/5' : 'shadow-none'} transition-all duration-300 ease-in-out`}>
        <aside className="flex items-center gap-3">
            <Sidebar user={user} showTopicAll={showTopicAll} setShowTopicAll={setShowTopicAll} />
            <span className="text-xl font-semibold cursor-pointer">ZTube</span>
        </aside>
        <div className="flex items-center justify-center w-[40rem]">
            <Input type="text" placeholder="Search" className="px-5 py-1 rounded-l-full border-r-0" />
            <Button variant="outline" className="rounded-l-none rounded-r-full h-[2.5rem]">
                <BiSearch />
            </Button>
        </div>
        <div className="flex gap-4 items-center">
            <CustomTooltip icon={<BiBell />} text="Notifications" />
            <ThemeToggle />
            {
                <Link href={`/user/${encodeURIComponent(user.username)}`}>
                    <Avatar className="w-8 h-8">
                        <Image src={user.image ? user.image : '/image/user.png'} width={32} height={32} alt='...' />
                    </Avatar>
                </Link>
            }
        </div>
    </nav>
}

export default Navbar