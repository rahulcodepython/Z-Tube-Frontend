"use client"
import Image from 'next/image'
import React from 'react'
import Dropzone from 'react-dropzone'

const MediaUploader = ({ media }) => {
    return (
        <Dropzone onDrop={acceptedFiles => {
            acceptedFiles.map(f => {
                media.push(f)
            })
        }}>
            {({ getRootProps, getInputProps }) => {
                return media.length > 0 ? <div className={`w-full h-[200px] grid grid-cols-${media.length === 1 ? '1' : '2'}`}>
                    <div className='w-full h-full overflow-y-scroll'>
                        <Image src={URL.createObjectURL(media[0])} width={100} height={100} className='w-fit h-fit' />
                    </div>
                    {
                        media.length > 1 ? <div className={`grid grid-cols-${media.slice(1, media.length).length < 2 ? 1 : 2} grid-rows-${media.slice(1, media.length).length <= 2 ? 1 : 2} w-full h-[200px]`}>
                            {
                                media.slice(1, media.length <= 5 ? 5 : 4).map((item, index) => {
                                    return <div className={`overflow-y-scroll ${media.slice(1, media.length).length === 3 ? 'last:col-span-2 ' : null}`} key={index}>
                                        <Image src={URL.createObjectURL(item)} width={100} height={100} className='w-fit h-fit' />
                                    </div>
                                })
                            }
                            {
                                media.length > 5 ? <div className="w-full h-full flex items-center justify-center text-5xl">
                                    +{media.length - 4}
                                </div> : null
                            }
                        </div> : null
                    }
                </div>
                    : <section className='border-dashed border-2 border-black p-8 flex justify-center items-center w-full h-60' {...getRootProps()}>
                        <div className='flex flex-col items-center justify-center'>
                            <input type="file" id="files" name="files" accept='.jpg , .jpeg , .jfif , .pjpeg , .pjp, .gif, .png, .mp4' multiple className='hidden' {...getInputProps()} />
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p className='text-gray-600'>Drag {`'n'`} drop some files here, or click to select files</p>
                        </div>
                    </section>
            }
            }
        </Dropzone>
    )
}

export default MediaUploader