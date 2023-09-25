"use client"
import { BsThreeDotsVertical } from 'react-icons/bs'
import Menu from '../server/Menu'
import React from 'react'

const VideosMenu = () => {
    const [toggleMenu, setToggleMenu] = React.useState(false)

    return (
        <>
            <BsThreeDotsVertical className='absolute top-2 right-0 cursor-pointer' onClick={() => setToggleMenu(pre => !toggleMenu)} />
            {
                toggleMenu ? <Menu /> : null
            }
        </>
    )
}

export default VideosMenu