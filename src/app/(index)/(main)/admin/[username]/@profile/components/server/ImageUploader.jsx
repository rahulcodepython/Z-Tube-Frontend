import React from 'react'
import ImageUploading from 'react-images-uploading';
import Image from 'next/image';
import { AiOutlineClose, BiCamera } from "@/data/icons/icons";

const ImageUploader = ({ image, setImage, setIsImageChange, mode }) => {
    return (
        <ImageUploading value={image} onChange={imageList => {
            setIsImageChange(pre => true)
            setImage(pre => imageList)
        }} dataURLKey="data_url">
            {({
                onImageUpload,
                onImageUpdate,
                onImageRemove,
                dragProps,
            }) => {
                return image.length > 0 ?
                    image.map((image, index) => {
                        return <div className='relative flex justify-center items-center group' key={index}>
                            <Image src={image.data_url} width={300} height={300} priority={false} alt='user image' className={`${mode === 'full' ? 'w-full h-full rounded-lg' : mode === 'dp' ? 'w-60 h-60 rounded-full' : mode === 'banner' ? 'w-full h-64 rounded-lg' : ''}`} />
                            <div className={`bg-whitebg-opacity-0 absolute ${mode === 'full' ? 'w-full h-full rounded-lg' : mode === 'dp' ? 'w-60 h-60 rounded-full' : mode === 'banner' ? 'w-full h-64 rounded-lg' : ''} text-2xl flex gap-4 items-center justify-center group-hover:bg-opacity-50 group-hover:bg-white/20 transition-all duration-300 ease-in-out`}>
                                <BiCamera onClick={() => onImageUpdate(index)} className='cursor-pointer opacity-0 group-hover:opacity-100 bg-background text-white p-2 rounded-full text-4xl' />
                                <AiOutlineClose onClick={() => {
                                    setIsImageChange(pre => false)
                                    onImageRemove(index)
                                }} className='cursor-pointer opacity-0 group-hover:opacity-100 bg-background text-white p-2 rounded-full text-4xl' />
                            </div>
                        </div>
                    }) : <section onClick={onImageUpload} {...dragProps} className='border-dashed border-2 p-8 flex justify-center items-center w-full h-60'>
                        <div className='flex flex-col items-center justify-center'>
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
        </ImageUploading>
    )
}

export default ImageUploader