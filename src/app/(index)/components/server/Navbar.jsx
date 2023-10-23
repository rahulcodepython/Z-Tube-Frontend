import { BiMenu, BiSearch, BiBell, HiOutlineViewGridAdd } from "@/data/icons/icons";
import { Tooltip } from 'react-tooltip'
import React from 'react'
import Link from "next/link";

const Navbar = ({ setToggleSidebar, toggleSidebar, toggleNavbar }) => {

    return (
        <nav className={`flex flex-wrap justify-between items-center px-5 p-2 ${toggleNavbar ? 'sticky top-0 z-20 shadow-2xl' : ''}`}>
            <div className="flex items-center gap-3">
                <BiMenu onClick={() => { setToggleSidebar(pre => !toggleSidebar) }} className="text-2xl cursor-pointer" />
                <span className="text-xl font-semibold cursor-pointer">ZTube</span>
            </div>
            <div className="flex items-center justify-center rounded-full border-2 border-black bg-transparent w-[40rem]">
                <input type="text" placeholder="Search" className="rounded-l-full px-5 py-1 w-full focus:outline-none bg-transparent text-white" />
                <div className="bg-transparent py-2 px-5 rounded-r-full cursor-pointer text-black">
                    <BiSearch />
                </div>
            </div>
            <div className="flex gap-4 items-center">
                <HiOutlineViewGridAdd className="text-2xl cursor-pointer" data-tooltip-id="create" data-tooltip-content="Create" />
                <Tooltip id="create" />
                <BiBell className="text-2xl cursor-pointer" data-tooltip-id="notification" data-tooltip-content="Notification" />
                <Tooltip id="notification" />
                {/* <img id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-10 h-10 rounded-full cursor-pointer" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80" alt="User dropdown" /> */}
                <Link href={'/auth/login'} className="px-3 py-2 bg-gray-300 text-black rounded-lg hover:scale-105 duration-300">
                    Login
                </Link>
            </div>
        </nav>
    )
}

export default Navbar