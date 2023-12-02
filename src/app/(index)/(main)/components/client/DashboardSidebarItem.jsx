import React from 'react'
import { Context } from '@/context/Context'
import { AiFillPieChart } from '@/data/icons/icons'
import Link from 'next/link'

const DashboardSidebarItem = () => {
    const { isAuthenticated, isUserData, userData } = React.useContext(Context)

    return (
        <li>
            <Link href={isAuthenticated && isUserData ? `/admin/${userData?.username}` : '/'} className="flex items-center p-2 text-white rounded-lg hover:bg-gray-100 group hover:text-gray-700">
                <AiFillPieChart />
                <span className="ml-3">
                    Dashboard
                </span>
            </Link>
        </li>
    )
}

export default DashboardSidebarItem