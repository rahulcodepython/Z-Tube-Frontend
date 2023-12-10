import { BiMenu, BiSearch, BiBell } from "@/data/icons/icons";
import { Tooltip } from 'react-tooltip'
import React from 'react'
import UserButton from "../client/UserButton";
import CreatePost from "../client/CreatePost";

const Navbar = ({ setToggleSidebar, toggleSidebar, toggleNavbar }) => {
    return (
        <nav className={`flex flex-wrap justify-between items-center px-5 p-2 w-full fixed bg-white top-0 z-30 ${toggleNavbar ? 'shadow-2xl' : 'shadow-none'} transition-all duration-300 ease-in-out`}>
            <div className="flex items-center gap-3">
                <BiMenu onClick={() => { setToggleSidebar(pre => !toggleSidebar) }} className="text-2xl cursor-pointer" />
                <span className="text-xl font-semibold cursor-pointer">ZTube</span>
            </div>
            <div className="flex items-center justify-center rounded-full border-2 border-black bg-transparent w-[40rem]">
                <input type="text" placeholder="Search" className="rounded-l-full px-5 py-1 w-full focus:outline-none bg-transparent text-black" />
                <div className="bg-transparent py-2 px-5 rounded-r-full cursor-pointer text-black">
                    <BiSearch />
                </div>
            </div>
            <div className="flex gap-4 items-center">
                <CreatePost />
                <BiBell className="text-2xl cursor-pointer focus:outline-none" data-tooltip-id="notification" data-tooltip-content="Notification" />
                <Tooltip id="notification" />
                <UserButton />
            </div>
        </nav>
    )
}

export default Navbar