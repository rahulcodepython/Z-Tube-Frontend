"use client"
import React from 'react'
import { Data } from '@/data/data/data'
import Link from 'next/link'

const SidebarItems = ({ setToggleSidebar }) => {
    const [showTopicAll, setShowTopicAll] = React.useState(false)

    return (
        <ul className="space-y-2 py-4">
            {
                Data.sidebar.topic.slice(0, (showTopicAll ? Data.sidebar.topic.length : 7)).map((item, index) => {
                    return <li key={index}>
                        <a href="#" className="flex items-center p-2 text-white rounded-lg hover:bg-gray-100 group hover:text-gray-700">
                            {item.icon}
                            <span className="ml-3">
                                {item.title}
                            </span>
                        </a>
                    </li>
                })
            }
            <li onClick={() => {
                setShowTopicAll(!showTopicAll)
                setToggleSidebar(true)
            }}>
                <Link href="#" className="flex items-center p-2 text-white rounded-lg hover:bg-gray-100 group hover:text-gray-700">
                    {showTopicAll ? 'Show Less' : 'Show More'}
                </Link>
            </li>
        </ul>
    )
}

export default SidebarItems