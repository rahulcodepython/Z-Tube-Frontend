"use client"
import React, { useState, useEffect, useRef } from 'react';
// import './VideoPlayer.css';
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
    const videoRef = useRef(null);
    const videoContainerRef = useRef(null);
    const [screenWidth, setScreenWidth] = useState(0)
    const [screenHeight, setScreenHeight] = useState(0)


    const timeParser = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = Math.floor(time % 60);

        if (hours === 0) {
            const formattedMinutes = minutes.toString().padStart(2, '0');
            const formattedSeconds = seconds.toString().padStart(2, '0');

            return `${formattedMinutes}:${formattedSeconds}`;
        }
        else {
            const formattedHours = hours.toString().padStart(2, '0');
            const formattedMinutes = minutes.toString().padStart(2, '0');
            const formattedSeconds = seconds.toString().padStart(2, '0');

            return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        }
    }

    // const hideControlsTimeout = setTimeout(() => {
    //     setShowControls(false);
    // }, 5000);

    useEffect(() => {
        setDuration(videoRef.current.duration);
        setScreenWidth(screen.width)
        setScreenHeight(screen.height)

        videoRef.current.addEventListener('timeupdate', () => {
            setCurrentTime(videoRef.current.currentTime);
        });

        // videoContainerRef.current.addEventListener('mouseenter', () => {
        //     setShowControls(true)
        //     // clearTimeout(hideControlsTimeout);
        // })

        // videoContainerRef.current.addEventListener('mouseleave', () => {
        //     setShowControls(false)
        // })
    }, []);

    useEffect(() => {
        setProgress(((videoRef.current.currentTime / videoRef.current.duration) * 100))
    }, [currentTime])

    const changeProgress = (e) => {
        videoRef.current.currentTime = (videoRef.current.duration * e.target.value) / 100;
        setProgress(e.target.value)
    }

    const togglePlayPause = () => {
        isPlaying ? videoRef.current.pause() : videoRef.current.play();
        setIsPlaying(!isPlaying)
    };

    const toggleMute = () => {
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted)
    };

    const changeVolume = (e) => {
        videoRef.current.volume = e.target.value;
        setVolume(e.target.value)
    };

    const changePlaybackRate = (e) => {
        videoRef.current.playbackRate = Number(e.target.value);
        setPlaybackRate(e.target.value);
    };

    const toggleFullscreen = () => {
        if (isFullscreen) {
            document.exitFullscreen();
            setIsFullscreen(false)
        } else {
            videoContainerRef.current.requestFullscreen();
            setIsFullscreen(true)
        }
    };
    console.log(progress);
    return (
        <div className={`container ${isFullscreen ? 'fullscreen' : ''}`} ref={videoContainerRef}>
            <div className="wrapper" style={{ opacity: 1, bottom: 0 }}>
                {/* <div className="wrapper" style={{ opacity: showControls ? 1 : 0, bottom: showControls ? 0 : -15 }}> */}
                <input type='range' min="0" max="100" step="any" className='w-full' value={progress} onChange={changeProgress} />
                <ul className="video-controls">
                    <li className="options left">
                        <button className="volume" onClick={toggleMute}>
                            {
                                isMuted ? <BsFillVolumeMuteFill /> : volume === 0 ? <BsFillVolumeMuteFill /> : volume < 0.3 ?
                                    <BsFillVolumeOffFill /> : volume < 0.7 ? <BsFillVolumeDownFill /> : <BsFillVolumeUpFill />
                            }
                        </button>
                        <input type="range" min="0" max="1" step="any" value={volume} onChange={changeVolume} />
                        <div className="video-timer">
                            <p className="current-time">{timeParser(currentTime)}</p>
                            <p className="separator"> / </p>
                            <p className="video-duration">{timeParser(duration)}</p>
                        </div>
                    </li>
                    <li className="options center">
                        <button className="skip-backward" onClick={() => videoRef.current.currentTime = videoRef.current.currentTime - 5}>
                            <AiFillBackward />
                        </button>
                        <button className="play-pause" onClick={togglePlayPause}>
                            {isPlaying ? <IoIosPause /> : <BsFillPlayFill />}
                        </button>
                        <button className="skip-forward" onClick={() => videoRef.current.currentTime = videoRef.current.currentTime + 5}>
                            <AiFillForward />
                        </button>
                    </li>
                    <li className="options right">
                        <div className="playback-content">
                            <select value={playbackRate} onChange={changePlaybackRate}>
                                speed
                                <option value={0.25}>0.25x</option>
                                <option value={0.5}>0.5x</option>
                                <option value={0.75}>0.75x</option>
                                <option value={1}>Normal</option>
                                <option value={1.25}>1.25x</option>
                                <option value={1.5}>1.5x</option>
                                <option value={1.75}>1.75x</option>
                                <option value={2}>2x</option>
                            </select>
                        </div>
                        <button className="pic-in-pic" onClick={() => videoRef.current.requestPictureInPicture()}>
                            <BsPip />
                        </button>
                        <button className="fullscreen" onClick={toggleFullscreen}>
                            {isFullscreen ? <BiExitFullscreen /> : <BiFullscreen />}
                        </button>
                    </li>
                </ul>
            </div>
            <video src="https://www.taxmann.com/emailer/images/CompaniesAct.mp4" className='mx-auto container' width={screenWidth} height={screenHeight - 500} ref={videoRef}></video>
        </div>
    )
}

export default VideoPlayer;