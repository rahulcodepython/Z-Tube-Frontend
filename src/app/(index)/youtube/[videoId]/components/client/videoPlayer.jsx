"use client"
import React, { useState, useEffect, useRef } from 'react';
import TimeParser from '@/functions/TimeParser';
import { BsFillVolumeUpFill, BsFillVolumeOffFill, BsFillVolumeMuteFill, BsFillVolumeDownFill, BsFillPlayFill, BsPip, IoIosPause, AiFillForward, AiFillBackward, MdSpeed, BiFullscreen, BiExitFullscreen } from '@/data/icons/icons'

const VideoPlayer = () => {
    // const [isRendered, setIsRendered] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(1);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showControls, setShowControls] = useState(true);
    const [progress, setProgress] = useState(0)
    const [screenWidth, setScreenWidth] = useState(0)
    const [screenHeight, setScreenHeight] = useState(0)
    const [showSpeedControl, setShowSpeedControl] = useState(false)
    const [showVolumeRange, setShowVolumeRange] = useState(false)
    const videoRef = useRef(null);
    const videoContainerRef = useRef(null);


    // const timeParser = (time) => {
    //     const hours = Math.floor(time / 3600);
    //     const minutes = Math.floor((time % 3600) / 60);
    //     const seconds = Math.floor(time % 60);

    //     if (hours === 0) {
    //         const formattedMinutes = minutes.toString().padStart(2, '0');
    //         const formattedSeconds = seconds.toString().padStart(2, '0');

    //         return `${formattedMinutes}:${formattedSeconds}`;
    //     }
    //     else {
    //         const formattedHours = hours.toString().padStart(2, '0');
    //         const formattedMinutes = minutes.toString().padStart(2, '0');
    //         const formattedSeconds = seconds.toString().padStart(2, '0');

    //         return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    //     }
    // }

    // const hideControlsTimeout = setTimeout(() => {
    //     setShowControls(false);
    // }, 5000);

    useEffect(() => {
        setScreenWidth(pre => screen.width)
        setScreenHeight(pre => screen.height)
        setCurrentTime(pre => videoRef.current.currentTime);
        setDuration(pre => videoRef.current.duration);
        videoRef.current.playbackRate = playbackRate;
        videoRef.current.volume = volume;

        // videoRef.current.addEventListener('loadedmetadata', () => {
        //     setDuration(videoRef.current.duration);
        // });

        // videoRef.current.addEventListener('timeupdate', () => {
        //     setCurrentTime(pre => videoRef.current.currentTime);
        // });

        // videoContainerRef.current.addEventListener('mouseenter', () => {
        //     setShowControls(true)
        //     clearTimeout(hideControlsTimeout);
        // })

        // videoContainerRef.current.addEventListener('mouseleave', () => {
        //     setShowControls(false)
        // })
    }, []);

    useEffect(() => {
        setProgress(pre => videoRef.current.currentTime === 0 ? 0 : ((videoRef.current.currentTime / videoRef.current.duration) * 100))
    }, [currentTime])

    const changeProgress = (e) => {
        videoRef.current.currentTime = (videoRef.current.duration * e.target.value) / 100;
        setProgress(pre => e.target.value)
    }

    const togglePlayPause = () => {
        isPlaying ? videoRef.current.pause() : videoRef.current.play();
        setIsPlaying(pre => !isPlaying)
    };

    const toggleMute = () => {
        videoRef.current.muted = !isMuted;
        setIsMuted(pre => !isMuted)
    };

    const changeVolume = (e) => {
        videoRef.current.volume = e.target.value;
        setVolume(pre => e.target.value)
    };

    const changePlaybackRate = (e) => {
        videoRef.current.playbackRate = e;
        setPlaybackRate(pre => e);
        setShowSpeedControl(pre => !showSpeedControl)
    };

    const toggleFullscreen = () => {
        if (isFullscreen) {
            document.exitFullscreen();
            setIsFullscreen(pre => false)
        } else {
            videoContainerRef.current.requestFullscreen();
            setIsFullscreen(pre => true)
        }
    };

    return (
        <div className={`flex justify-center items-center ${isFullscreen ? 'fullscreen' : ''} relative`} ref={videoContainerRef}>
            <div className={`bg-gradient-to-t from-black to-transparent text-white absolute ${showControls ? 'bottom-0 opacity-100' : '-bottom-4 opacity-0'} flex flex-col items-center justify-center w-full z-20`} onMouseLeave={() => setShowVolumeRange(false)}>
                <input type='range' min="0" max="100" step="any" className='w-full h-1 bg-gray-400 accent-black rounded-lg appearance-none cursor-pointer range-sm' value={progress} onChange={changeProgress} />
                <ul className="w-full flex justify-between items-center px-8 py-4">
                    <li className="left flex justify-center items-center gap-4">
                        <div className="flex justify-center items-center">
                            <p>{TimeParser(currentTime)}</p>
                            <p> / </p>
                            <p>{TimeParser(duration)}</p>
                        </div>
                        <div className='flex justify-center items-center gap-1'>
                            <button className="relative" onMouseEnter={() => setShowVolumeRange(true)} onClick={toggleMute}>
                                {
                                    isMuted ? <BsFillVolumeMuteFill className="text-2xl" /> : volume === 0 ? <BsFillVolumeMuteFill className="text-2xl" /> : volume < 0.3 ?
                                        <BsFillVolumeOffFill className="text-2xl" /> : volume < 0.7 ? <BsFillVolumeDownFill className="text-2xl" /> : <BsFillVolumeUpFill className="text-2xl" />
                                }
                            </button>
                            <input type="range" min="0" max="1" step="any" className={`${showVolumeRange ? 'w-24' : 'w-0'} transition-all ease-in-out duration-150 h-1 absolute left-48 bg-gray-400 accent-black rounded-lg appearance-none cursor-pointer range-sm`} value={volume} onChange={changeVolume} />
                        </div>
                    </li>
                    <li className="center flex justify-center items-center gap-4">
                        <button onClick={() => videoRef.current.currentTime = videoRef.current.currentTime - 5}>
                            <AiFillBackward className="text-2xl" />
                        </button>
                        <button onClick={togglePlayPause}>
                            {isPlaying ? <IoIosPause className="text-2xl" /> : <BsFillPlayFill className="text-2xl" />}
                        </button>
                        <button onClick={() => videoRef.current.currentTime = videoRef.current.currentTime + 5}>
                            <AiFillForward className="text-2xl" />
                        </button>
                    </li>
                    <li className="right flex items-center justify-center gap-4">
                        <div className="relative">
                            <MdSpeed className='text-2xl cursor-pointer' onClick={() => setShowSpeedControl(!showSpeedControl)} />
                            <div className={`${showSpeedControl ? 'flex h-auto' : 'hidden h-0'} transition-all ease-in-out duration-200 absolute flex-col gap-1 rounded-lg bg-black bottom-8`}>
                                <span className='cursor-pointer text-white hover:bg-gray-500 p-2 first:rounded-t-lg' onClick={() => changePlaybackRate(0.25)}>0.25x</span>
                                <span className='cursor-pointer text-white hover:bg-gray-500 p-2' onClick={() => changePlaybackRate(0.5)}>0.5x</span>
                                <span className='cursor-pointer text-white hover:bg-gray-500 p-2' onClick={() => changePlaybackRate(0.75)}>0.75x</span>
                                <span className='cursor-pointer text-white hover:bg-gray-500 p-2' onClick={() => changePlaybackRate(1.0)}>Normal</span>
                                <span className='cursor-pointer text-white hover:bg-gray-500 p-2' onClick={() => changePlaybackRate(1.25)}>1.25x</span>
                                <span className='cursor-pointer text-white hover:bg-gray-500 p-2' onClick={() => changePlaybackRate(1.5)}>1.5x</span>
                                <span className='cursor-pointer text-white hover:bg-gray-500 p-2' onClick={() => changePlaybackRate(1.75)}>1.75x</span>
                                <span className='cursor-pointer text-white hover:bg-gray-500 p-2 last:rounded-b-lg' onClick={() => changePlaybackRate(2.0)}>2x</span>
                            </div>
                        </div>
                        <button onClick={() => videoRef.current.requestPictureInPicture()}>
                            <BsPip className="text-2xl" />
                        </button>
                        <button onClick={toggleFullscreen}>
                            {isFullscreen ? <BiExitFullscreen className="text-2xl" /> : <BiFullscreen className="text-2xl" />}
                        </button>
                    </li>
                </ul>
            </div>
            {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/h5SFN7Kgzds?si=_THcHJWyAd_c2NHH" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
            {/* <video src="https://www.taxmann.com/emailer/images/CompaniesAct.mp4" className='' width={screenWidth} height={screenHeight - 500} ref={videoRef}></video> */}
            {/* <video src="https://www.youtube.com/embed/h5SFN7Kgzds?si=_THcHJWyAd_c2NHH" width={screenWidth} height={screenHeight - 500} ref={videoRef}></video> */}
            <video src="/video/videoplayback.mp4" width={screenWidth} height={screenHeight - 500} ref={videoRef}></video>
        </div>
    )
}

export default VideoPlayer;