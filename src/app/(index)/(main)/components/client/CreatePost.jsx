"use client"
import React from 'react'
import Modal from 'react-modal';
import { AiOutlineClose, BiCamera, FiEdit, HiOutlineViewGridAdd } from '@/data/icons/icons'
import ImageUploading from 'react-images-uploading';
import Image from 'next/image';
import { Field, Form, Formik } from 'formik';
import axios from 'axios';
import { Context } from '@/context/Context';
import { Tooltip } from 'react-tooltip';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Dropzone from 'react-dropzone'
import { analytics } from '@/lib/firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const CreatePost = () => {
    const { isAuthenticated, isAccessToken, accessToken } = React.useContext(Context)

    const [isOpen, setIsOpen] = React.useState(false);
    const [tagsInput, setTagsInput] = React.useState('')
    const [tags, setTags] = React.useState([])
    const [formData, setFormData] = React.useState({})
    const [image, setImage] = React.useState([])
    const [video, setVideo] = React.useState([])

    const router = useRouter()

    const customStyles = {
        content: {
            width: '50%',
            border: 'none',
            background: 'none',
            borderRadius: '10px',
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

    const addTags = () => {
        if (tagsInput.trim().length > 0) {
            if (!tags.includes(tagsInput)) {
                setFormData({
                    ...formData,
                    tags: JSON.stringify([...tags, tagsInput]),
                })
                setTags(pre => [...pre, tagsInput])
            }
        }
        setTagsInput(pre => '')
    }

    const removeTags = (tag) => {
        setFormData({
            ...formData,
            tags: JSON.stringify(tags.filter(t => t !== tag)),
        })
        setTags(pre => pre.filter(t => t !== tag))
    }

    const onModalClose = () => {
        setFormData({})
        setIsOpen(pre => false)
        setImage(pre => [])
        setTagsInput(pre => '')
        setTags(pre => [])
    }

    React.useEffect(() => {
        Modal.setAppElement(document.getElementById('editPageModal'));
    }, [])

    return (
        <div id='editPageModal'>
            <button onClick={() => setIsOpen(pre => true)} className='bg-white text-blackfont-semibold flex items-center'>
                {/* <button onClick={() => isAuthenticated ? setIsOpen(pre => true) : router.push('/auth/login')} className='bg-white text-blackfont-semibold flex items-center'> */}
                <HiOutlineViewGridAdd className="text-2xl cursor-pointer focus:outline-none" data-tooltip-id="create" data-tooltip-content="Create" />
                <Tooltip id="create" />
            </button>
            <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(pre => false)} style={customStyles} contentLabel="Example Modal">
                <section className="w-full h-[80vh] relative flex flex-col bg-gray-100">
                    <div className="p-4 bg-white text-center flex items-center justify-between shadow-md z-20">
                        <h6 className="text-gray-700 text-xl font-bold">
                            Create Post
                        </h6>
                        <div className='flex justify-between items-center gap-4'>
                            <button onClick={onModalClose} className="bg-black text-white hover:bg-gray-100 hover:text-black hover:scale-125 hover:border hover:border-black font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none ease-linear transition-all duration-150" type="button">
                                Close
                            </button>
                        </div>
                    </div>
                    <Formik initialValues={{
                        caption: '',
                        visibility: 'everyone'
                    }}
                        onSubmit={() => {
                            if (isAuthenticated && isAccessToken) {
                                // const option = {
                                //     headers: {
                                //         Authorization: `JWT ${accessToken}`,
                                //         "Content-Type": "multipart/form-data",
                                //     }
                                // }

                                const HandleTostify = new Promise((resolve, rejected) => {
                                    if (image.length > 0) {
                                        const fileref = ref(analytics, `Facebook/Image/${image[0].file.name}`)
                                        uploadBytes(fileref, image[0].file)
                                            .then(async response => {
                                                const downloadUrl = await getDownloadURL(response.ref)
                                                console.log(downloadUrl);
                                                resolve();
                                            })
                                            .catch((error) => {
                                                rejected();
                                                onModalClose()
                                            });
                                    }
                                });
                                //     axios.post(`${process.env.BACKEND_DOMAIN_NAME}/auth/hi/`, formData, option)
                                //         .then((response) => {
                                //             resolve();
                                //             onModalClose()
                                //             console.log(response);
                                //         })
                                //         .catch((error) => {
                                //             rejected();
                                //             onModalClose()
                                //         });

                                toast.promise(
                                    HandleTostify,
                                    {
                                        pending: 'Your request is on process.',
                                        success: 'Your post is uploaded.',
                                        error: 'There is some issue, Try again.'
                                    }
                                )
                            }
                        }}>
                        {({ values, handleChange, handleSubmit }) => (
                            <Form onKeyDown={(e) => {
                                e.key === 'Enter' ? e.preventDefault() : null;
                            }} className="flex flex-col justify-between divide-y-2 gap-4 divide-gray-300 first:divide-y-0 px-4 lg:px-10 py-10 overflow-y-scroll h-[80vh]">
                                <div className='flex flex-col justify-start gap-8 pt-4 first:pt-0'>
                                    <h6 className="text-gray-400 text-sm font-bold uppercase">
                                        Post Details
                                    </h6>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-2">
                                            <div className="w-full flex flex-col gap-2">
                                                <label className="block uppercase text-gray-600 text-xs font-bold" htmlFor="grid-password">
                                                    Visibility
                                                </label>
                                                <Field as="select" name="visibility" id={'visibility'} onChange={(e) => {
                                                    handleChange(e)
                                                    setFormData({
                                                        ...formData,
                                                        visibility: e.target.value
                                                    })
                                                }}
                                                    className="border-0 p-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                                    <option value="everyone">Everyone</option>
                                                    <option value="connections">Only Connections</option>
                                                    <option value="me">Only Me</option>
                                                </Field>
                                            </div>
                                        </div>
                                        <div className="col-span-2">
                                            <div className="w-full flex flex-col gap-2">
                                                <label className="block uppercase text-gray-600 text-xs font-bold" htmlFor="grid-password">
                                                    Caption
                                                </label>
                                                <Field type="text" name="caption" id={'caption'} onChange={(e) => {
                                                    handleChange(e)
                                                    setFormData({
                                                        ...formData,
                                                        caption: e.target.value
                                                    })
                                                }}
                                                    className="border-0 p-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                            </div>
                                        </div>
                                        <div className="col-span-2">
                                            <div className="w-full flex flex-col gap-2">
                                                <label className="block uppercase text-gray-600 text-xs font-bold" htmlFor="grid-password">
                                                    Tags
                                                </label>
                                                <input type="text" className={`border-0 p-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ${tags.length >= 3 ? 'focus:ring-gray-400' : ''} w-full ease-linear transition-all duration-150`} value={tagsInput} onChange={e => setTagsInput(pre => e.target.value)} onKeyUp={e => e.key === 'Enter' ? addTags() : null} readOnly={tags.length >= 3 ? true : false} />
                                                <div className='flex items-center gap-2 my-2'>
                                                    {
                                                        tags.map((tag, index) => (
                                                            <div key={index} className='flex items-center justify-center gap-2 bg-gray-200 rounded-full p-2 text-xs font-semibold text-black'>
                                                                #{tag}
                                                                <span className='cursor-pointer rounded-full bg-gray-300 p-1' onClick={() => removeTags(tag)}>
                                                                    <AiOutlineClose />
                                                                </span>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-span-2'>
                                            <Tabs defaultIndex={0}>
                                                <TabList>
                                                    <Tab>Text</Tab>
                                                    <Tab>Image</Tab>
                                                    <Tab>Videos</Tab>
                                                </TabList>
                                                <TabPanel>
                                                    <textarea rows={6} placeholder='Share your feelings' className='w-full rounded-lg p-4 outline-none border-0'>
                                                    </textarea>
                                                </TabPanel>
                                                <TabPanel>
                                                    {
                                                        <ImageUploading value={image} onChange={imageList => setImage(pre => imageList)} dataURLKey="data_url">
                                                            {({
                                                                onImageUpload,
                                                                onImageUpdate,
                                                                onImageRemove,
                                                                dragProps,
                                                            }) => {
                                                                return image.length <= 0 ? <section onClick={onImageUpload} {...dragProps} className='border-dashed border-2 border-black p-8 flex justify-center items-center w-full h-60'>
                                                                    <div className='flex flex-col items-center justify-center'>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                                                                            stroke="currentColor" strokeWidth="2">
                                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                                        </svg>
                                                                        <p className='text-gray-600'>Drag {`'n'`} drop some files here, or click to select files</p>
                                                                    </div>
                                                                </section>
                                                                    : image.map((image, index) => {
                                                                        return <div className='relative flex justify-center items-center group' key={index}>
                                                                            <Image src={image.data_url} width={300} height={300} priority={false} alt='user image' className='w-full h-40 rounded-lg' />
                                                                            <div className='bg-white bg-opacity-0 absolute w-full h-full text-2xl flex gap-4 items-center justify-center group-hover:bg-opacity-50 transition-all duration-300 ease-in-out'>
                                                                                <BiCamera onClick={() => onImageUpdate(index)} className='cursor-pointer opacity-0 group-hover:opacity-100 bg-black text-white p-2 rounded-full text-4xl' />
                                                                                <AiOutlineClose onClick={() => onImageRemove(index)} className='cursor-pointer opacity-0 group-hover:opacity-100 bg-black text-white p-2 rounded-full text-4xl' />
                                                                            </div>
                                                                        </div>
                                                                    })
                                                            }
                                                            }
                                                        </ImageUploading>
                                                    }
                                                </TabPanel>
                                                <TabPanel>
                                                    <Dropzone onDrop={acceptedFiles => setVideo(pre => acceptedFiles[0])} accept={{ 'video/*': ['.mp4',] }}>
                                                        {({ getRootProps, getInputProps }) => {
                                                            return <section className='border-dashed border-2 border-black p-8 flex justify-center items-center w-full h-60'>
                                                                <div {...getRootProps()} className='flex flex-col items-center justify-center'>
                                                                    <input {...getInputProps()} />
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                                                                        stroke="currentColor" strokeWidth="2">
                                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                                    </svg>
                                                                    <p className='text-gray-600'>Drag {`'n'`} drop some files here, or click to select files</p>
                                                                </div>
                                                            </section>
                                                        }}
                                                    </Dropzone>
                                                </TabPanel>
                                            </Tabs>
                                        </div>
                                    </div>
                                </div>
                                <button type='submit' onClick={handleSubmit} className="bg-black text-white hover:bg-gray-100 hover:text-black hover:border hover:border-black font-bold uppercase text-xs py-2 rounded shadow hover:shadow-md outline-none ease-linear transition-all duration-150">
                                    Upload
                                </button>
                            </Form>
                        )}
                    </Formik>
                </section>
            </Modal>
        </div>
    )
}

export default CreatePost