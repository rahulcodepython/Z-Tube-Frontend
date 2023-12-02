import React from 'react'
import { Data } from '@/data/data/data'
import Link from 'next/link'
import SidebarItems from '../client/SidebarItems'
import DashboardSidebarItem from '../client/DashboardSidebarItem'

const Sidebar = ({ toggleSidebar, setToggleSidebar, sidebarRef }) => {

    return (
        <div id="drawer-navigation" className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${!toggleSidebar ? '-translate-x-full' : ''} w-64 bg-gray-800`} tabIndex="-1" aria-labelledby="drawer-navigation-label" ref={sidebarRef}>
            <h5 id="drawer-navigation-label" className="text-base font-semibold text-gray-500 uppercase">
                Menu
            </h5>
            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-700 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center" onClick={() => setToggleSidebar(pre => false)}>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
            </button>
            <div className="flex flex-col py-4 overflow-y-scroll divide-y-2 divide-slate-500 scroll-smooth">
                <ul className="space-y-2 pb-4">
                    {
                        Data.sidebar.social.map((item, index) => {
                            return <li key={index}>
                                <Link href={item?.link} className="flex items-center p-2 text-white rounded-lg hover:bg-gray-100 group hover:text-gray-700">
                                    {item.icon}
                                    <span className="ml-3">
                                        {item.title}
                                    </span>
                                </Link>
                            </li>
                        })
                    }
                </ul>
                <ul className="space-y-2 py-4">
                    {
                        Data.sidebar.explore.map((item, index) => {
                            return <li key={index}>
                                <a href={item?.link} className="flex items-center p-2 text-white rounded-lg hover:bg-gray-100 group hover:text-gray-700">
                                    {item.icon}
                                    <span className="ml-3">
                                        {item.title}
                                    </span>
                                </a>
                            </li>
                        })
                    }
                </ul>
                <SidebarItems setToggleSidebar={setToggleSidebar} />
                <ul className="space-y-2 pt-4">
                    <DashboardSidebarItem />
                    {
                        Data.sidebar.recources.map((item, index) => {
                            return <li key={index}>
                                <a href={item?.link} className="flex items-center p-2 text-white rounded-lg hover:bg-gray-100 group hover:text-gray-700">
                                    {item.icon}
                                    <span className="ml-3">
                                        {item.title}
                                    </span>
                                </a>
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Sidebar