"use client"
import React from 'react'
import TimeParser from '@/functions/TimeParser'

const VideoDuration = ({ link }) => {
    const [duration, setDuration] = React.useState(0)
    const [isRendered, setIsRendered] = React.useState(false)
    const video = React.useRef(null)

    React.useEffect(() => {
        video.current.addEventListener('loadedmetadata', () => {
            // setDuration(pre => video.current.duration);
            setIsRendered(pre => true)
        });
        // setDuration(pre => video.current.duration)
        // console.log(video.current);
    }, [])
    console.log(isRendered);
    return (
        <>
            {
                isRendered ? <span className="bg-black text-white text-xs px-2.5 py-0.5 rounded absolute bottom-2 right-2">
                    {TimeParser(duration)}
                </span> : null
            }
            <video src="/video/videoplayback.mp4" width={0} height={0} ref={video} className='hidden'></video>
        </>
    )
}

export default VideoDuration