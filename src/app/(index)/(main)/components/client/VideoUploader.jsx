"use client"
import React from "react";
import { AiOutlineClose, BiCamera } from "@/data/icons/icons";

const VideoUploader = ({ video, setVideo }) => {
    const height = 200

    const inputRef = React.useRef();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        setVideo(pre => [url]);
    };

    const handleChoose = (event) => {
        inputRef.current.click();
    };

    return (

        video.length > 0 ? <div className="relative group">
            <video
                className="VideoInput_video"
                width="100%"
                height={height}
                controls
                src={video}
            />
            <div className="bg-opacity-0 absolute top-4 right-4 text-2xl flex gap-4 items-center justify-center group-hover:bg-opacity-50 transition-all duration-300 ease-in-out">
                <BiCamera onClick={handleChoose} className='cursor-pointer opacity-0 group-hover:opacity-100 bg-darkModeBG text-white p-2 rounded-full text-4xl' />
                <input
                    ref={inputRef}
                    className="hidden"
                    type="file"
                    onChange={handleFileChange}
                    accept=".mov,.mp4"
                />
                <AiOutlineClose onClick={() => setVideo(pre => [])} className='cursor-pointer opacity-0 group-hover:opacity-100 bg-darkModeBG text-white p-2 rounded-full text-4xl' />

            </div>
        </div> : <section className='border-dashed border-2 border-darkModeBG dark:bg-white p-8 flex justify-center items-center w-full h-60' onClick={handleChoose}>
            <div className='flex flex-col items-center justify-center'>
                <input
                    ref={inputRef}
                    className="hidden"
                    type="file"
                    onChange={handleFileChange}
                    accept=".mov,.mp4"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className='text-gray-600'>Drag {`'n'`} drop some files here, or click to select files</p>
            </div>
        </section>
    )
}

export default VideoUploader
