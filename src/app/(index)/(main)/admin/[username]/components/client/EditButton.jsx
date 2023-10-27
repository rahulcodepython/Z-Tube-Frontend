"use client"
import React from 'react'
import Modal from 'react-modal';
import { AiOutlineClose, BiCamera, FiEdit } from '@/data/icons/icons'
import ImageUploading from 'react-images-uploading';
import Image from 'next/image';

const EditButton = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [userTagsInput, setUserTagsInput] = React.useState('')
    const [userTags, setUserTags] = React.useState([])
    const [userImage, setUserImage] = React.useState([])
    const [bannarImage, setBannarImage] = React.useState([])

    const customStyles = {
        content: {
            width: '50%',
            border: 'none',
            background: 'none',
            borderRadius: '0px',
            outline: '0px',
            padding: '0px',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const addRemoveTags = () => {
        if (userTagsInput.length > 0) {
            if (!userTags.includes(userTagsInput)) {
                setUserTags(pre => [...pre, userTagsInput])
            }
            setUserTagsInput(pre => '')
        }
    }

    React.useEffect(() => {
        Modal.setAppElement(document.getElementById('editPageModal'));
    }, [])

    return (
        <div id='editPageModal'>
            <button onClick={() => setIsOpen(pre => true)} className='bg-white text-black rounded-md px-4 py-2 font-semibold flex items-center justify-center gap-2'>
                <FiEdit />
                <span>
                    Edit Profile
                </span>
            </button>
            <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(pre => false)} style={customStyles} contentLabel="Example Modal">
                <section className="w-full overflow-y-scroll h-[80vh]">
                    <div className="relative flex flex-col w-full rounded-lg bg-gray-100">
                        <div className="p-4 bg-white">
                            <div className="text-center flex items-center justify-between">
                                <h6 className="text-gray-700 text-xl font-bold">
                                    My account
                                </h6>
                                <div className='flex justify-between items-center gap-4'>
                                    <button className="bg-black text-white hover:bg-gray-100 hover:text-black hover:scale-125 hover:border hover:border-black font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none ease-linear transition-all duration-150" type="button">
                                        Update
                                    </button>
                                    <button onClick={() => setIsOpen(pre => false)} className="bg-black text-white hover:bg-gray-100 hover:text-black hover:scale-125 hover:border hover:border-black font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none ease-linear transition-all duration-150" type="button">
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                        <form className="flex flex-col justify-center divide-y-2 gap-4 divide-gray-300 first:divide-y-0 px-4 lg:px-10 py-10">
                            <div className='flex flex-col justify-start gap-8 pt-4 first:pt-0'>
                                <h6 className="text-gray-400 text-sm font-bold uppercase">
                                    Basic Information
                                </h6>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className='col-span-2 flex flex-col justify-center gap-2'>
                                        <label className="block uppercase text-gray-600 text-xs font-bold" htmlFor="grid-password">
                                            Banner Image
                                        </label>
                                        {
                                            <ImageUploading value={bannarImage} onChange={(imageList) => setBannarImage(pre => imageList)} dataURLKey="data_url">
                                                {({
                                                    onImageUpload,
                                                    onImageUpdate,
                                                    onImageRemove,
                                                    dragProps,
                                                }) => {
                                                    return bannarImage.length <= 0 ? <section onClick={onImageUpload} {...dragProps} className='border-dashed border-2 border-black p-8 flex justify-center items-center w-full'>
                                                        <div className='flex flex-col items-center justify-center'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                                                                stroke="currentColor" stroke-width="2">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                            </svg>
                                                            <p className='text-gray-600'>Drag 'n' drop some files here, or click to select files</p>
                                                        </div>
                                                    </section>
                                                        : bannarImage.map((image, index) => {
                                                            return <div className='relative flex justify-center items-center group' key={index}>
                                                                <Image src={image.data_url} width={300} height={300} alt='user image' className='w-full h-40 rounded-lg' />
                                                                <div className='bg-white bg-opacity-0 absolute w-full h-full text-2xl flex gap-4 items-center justify-center group-hover:bg-opacity-50 transition-all duration-300 ease-in-out'>
                                                                    <BiCamera onClick={() => onImageUpdate(index)} className='cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out' />
                                                                    <AiOutlineClose onClick={() => onImageRemove(index)} className='cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out' />
                                                                </div>
                                                            </div>
                                                        })
                                                }
                                                }
                                            </ImageUploading>
                                        }
                                    </div>
                                    <div className='col-span-2 flex flex-col justify-center gap-2'>
                                        <label className="block uppercase text-gray-600 text-xs font-bold" htmlFor="grid-password">
                                            User Image
                                        </label>
                                        {
                                            <ImageUploading value={userImage} onChange={(imageList) => setUserImage(pre => imageList)} dataURLKey="data_url">
                                                {({
                                                    onImageUpload,
                                                    onImageUpdate,
                                                    onImageRemove,
                                                    dragProps,
                                                }) => {
                                                    return userImage.length <= 0 ? <section onClick={onImageUpload} {...dragProps} className='border-dashed border-2 border-black p-8 flex justify-center items-center w-full'>
                                                        <div className='flex flex-col items-center justify-center'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                                                                stroke="currentColor" stroke-width="2">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                            </svg>
                                                            <p className='text-gray-600'>Drag 'n' drop some files here, or click to select files</p>
                                                        </div>
                                                    </section>
                                                        : userImage.map((image, index) => {
                                                            return <div key={index} className='w-full flex items-center justify-center'>
                                                                <div className='relative flex items-center justify-center group w-60 h-60 rounded-full bg-red-600'>
                                                                    <Image src={image.data_url} width={300} height={300} alt='user image' className='rounded-full w-60 h-60' />
                                                                    <div className='bg-white bg-opacity-0 absolute w-full h-full text-2xl flex gap-4 items-center justify-center group-hover:bg-opacity-50 transition-all duration-300 ease-in-out'>
                                                                        <BiCamera onClick={() => onImageUpdate(index)} className='cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out' />
                                                                        <AiOutlineClose onClick={() => onImageRemove(index)} className='cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out' />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        })
                                                }
                                                }
                                            </ImageUploading>
                                        }
                                    </div>
                                    <div className="col-span-1">
                                        <div className="w-full flex flex-col gap-2">
                                            <label className="block uppercase text-gray-600 text-xs font-bold" htmlFor="grid-password">
                                                First Name
                                            </label>
                                            <input type="text" className="border-0 p-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" defaultValue="Lucky" readOnly />
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <div className="w-full flex flex-col gap-2">
                                            <label className="block uppercase text-gray-600 text-xs font-bold" htmlFor="grid-password">
                                                Last Name
                                            </label>
                                            <input type="text" className="border-0 p-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" defaultValue="Jesse" readOnly />
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="w-full flex flex-col gap-2">
                                            <label className="block uppercase text-gray-600 text-xs font-bold" htmlFor="grid-password">
                                                About me
                                            </label>
                                            <textarea type="text" className="border-0 p-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" rows="4" readOnly>
                                                A beautiful UI Kit and Admin for JavaScript &amp; Tailwind CSS. It is Freeand Open Source.
                                            </textarea>
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="w-full flex flex-col gap-2">
                                            <label className="block uppercase text-gray-600 text-xs font-bold" htmlFor="grid-password">
                                                Tags
                                            </label>
                                            <input type="text" className={`border-0 p-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ${userTags.length >= 5 ? 'focus:ring-gray-400' : ''} w-full ease-linear transition-all duration-150`} value={userTagsInput} onChange={e => setUserTagsInput(pre => e.target.value)} onKeyUp={e => e.key === 'Enter' ? addRemoveTags() : null} readOnly={userTags.length >= 5 ? true : false} />
                                            <div className='flex items-center gap-2 my-2'>
                                                {
                                                    userTags.map((tag, index) => (
                                                        <div key={index} className='flex items-center justify-center gap-2 bg-gray-200 rounded-full p-2 text-xs font-semibold text-black'>
                                                            #{tag}
                                                            <span className='cursor-pointer rounded-full bg-gray-300 p-1' onClick={() => setUserTags(pre => pre.filter(t => t !== tag))}>
                                                                <AiOutlineClose />
                                                            </span>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </Modal>
        </div>
    )
}

export default EditButton