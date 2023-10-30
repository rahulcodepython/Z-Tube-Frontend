"use client"
import { BsThreeDotsVertical } from 'react-icons/bs'
import Menu from '../server/Menu'
import React from 'react'

const VideosMenu = () => {
    const [toggleMenu, setToggleMenu] = React.useState(false)

    const menuRef = React.useRef(null)

    const handleToggle = (event) => {
        (menuRef.current && menuRef.current.contains(event.target)) ? setToggleMenu(pre => true) : setToggleMenu(pre => false);
    }

    React.useEffect(() => {
        document.addEventListener('click', handleToggle);
        return () => {
            document.removeEventListener('click', handleToggle);
        };
    }, [toggleMenu]);

    return (
        <>
            <BsThreeDotsVertical onClick={() => setToggleMenu(pre => !toggleMenu)} />
            {
                toggleMenu ? <Menu menuRef={menuRef} /> : null
            }
        </>
    )
}

export default VideosMenu