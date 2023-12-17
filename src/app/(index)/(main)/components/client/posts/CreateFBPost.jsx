// import React from 'react'
// import { useFormik } from 'formik';

// // import { AiOutlineClose, BiCamera, FiEdit, HiOutlineViewGridAdd } from '@/data/icons/icons'
// // import ImageUploading from 'react-images-uploading';
// // import Image from 'next/image';
// // import { Field, Form, Formik } from 'formik';
// // import axios from 'axios';
// // import { Context } from '@/context/Context';
// // import { Tooltip } from 'react-tooltip';
// // import { useRouter } from 'next/navigation';
// // import { toast } from 'react-toastify';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
// // import Dropzone from 'react-dropzone'
// // import { analytics } from '@/lib/firebase/config';
// // // import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
// // import ImageUploader from '../ImageUploader';
// // import VideoUploader from '../VideoUploader';
// // import VideoUploader from './VideoUploader';
// // import ImageUploader from './ImageUploader';

// const CreateFBPost = () => {
//     // const { isAuthenticated, isAccessToken, accessToken } = React.useContext(Context)

//     // const [isOpen, setIsOpen] = React.useState(false);
//     // const [tagsInput, setTagsInput] = React.useState('')
//     // const [tags, setTags] = React.useState([])
//     // const [formData, setFormData] = React.useState({})
//     // const [image, setImage] = React.useState([])
//     // const [isImageChange, setIsImageChange] = React.useState(false)
//     // const [video, setVideo] = React.useState([])
//     // const [isVideoChange, setIsVideoChange] = React.useState(false)

//     const formik = useFormik({
//         initialValues: {
//             firstName: '',
//             lastName: '',
//             email: '',
//         },
//         onSubmit: values => {
//             alert(JSON.stringify(values, null, 2));
//         },
//     });

//     // const addTags = () => {
//     //     if (tagsInput.trim().length > 0) {
//     //         if (!tags.includes(tagsInput)) {
//     //             setFormData({
//     //                 ...formData,
//     //                 tags: JSON.stringify([...tags, tagsInput]),
//     //             })
//     //             setTags(pre => [...pre, tagsInput])
//     //         }
//     //     }
//     //     setTagsInput(pre => '')
//     // }

//     // const removeTags = (tag) => {
//     //     setFormData({
//     //         ...formData,
//     //         tags: JSON.stringify(tags.filter(t => t !== tag)),
//     //     })
//     //     setTags(pre => pre.filter(t => t !== tag))
//     // }

//     return (
//         // <Formik initialValues={{
//         //     caption: '',
//         //     visibility: 'everyone'
//         // }}
//         //     onSubmit={() => {
//         //         if (isAuthenticated && isAccessToken) {
//         //             // const option = {
//         //             //     headers: {
//         //             //         Authorization: `JWT ${accessToken}`,
//         //             //         "Content-Type": "multipart/form-data",
//         //             //     }
//         //             // }

//         //             const HandleTostify = new Promise((resolve, rejected) => {
//         //                 if (image.length > 0) {
//         //                     const fileref = ref(analytics, `Facebook/Image/${image[0].file.name}`)
//         //                     uploadBytes(fileref, image[0].file)
//         //                         .then(async response => {
//         //                             const downloadUrl = await getDownloadURL(response.ref)
//         //                             console.log(downloadUrl);
//         //                             resolve();
//         //                         })
//         //                         .catch((error) => {
//         //                             rejected();
//         //                             onModalClose()
//         //                         });
//         //                 }
//         //             });
//         //             //     axios.post(`${process.env.BACKEND_DOMAIN_NAME}/auth/hi/`, formData, option)
//         //             //         .then((response) => {
//         //             //             resolve();
//         //             //             onModalClose()
//         //             //             console.log(response);
//         //             //         })
//         //             //         .catch((error) => {
//         //             //             rejected();
//         //             //             onModalClose()
//         //             //         });

//         //             toast.promise(
//         //                 HandleTostify,
//         //                 {
//         //                     pending: 'Your request is on process.',
//         //                     success: 'Your post is uploaded.',
//         //                     error: 'There is some issue, Try again.'
//         //                 }
//         //             )
//         //         }
//         //     }}>
//         //     {({ values, handleChange, handleSubmit }) => (
//         <form onSubmit={formik.handleSubmit}
//             // onKeyDown={(e) => {
//             //     e.key === 'Enter' ? e.preventDefault() : null;
//             // }} 
//             className="flex flex-col justify-between divide-y-2 gap-4 divide-gray-300 first:divide-y-0 px-4 lg:px-10 py-10 overflow-y-scroll h-[80vh]">
//             <div className='flex flex-col justify-start gap-8 pt-4 first:pt-0'>
//                 <h6 className="text-gray-400 text-sm font-bold uppercase">
//                     Post Details
//                 </h6>
//                 <div className="grid grid-cols-2 gap-4">
//                     {
//                         // <div className="col-span-2">
//                         //     <div className="w-full flex flex-col gap-2">
//                         //         <label className="block uppercase text-gray-600 text-xs font-bold" htmlFor="grid-password">
//                         //             Visibility
//                         //         </label>
//                         //         {/* <Field as="select" name="visibility" id={'visibility'} onChange={(e) => {
//                         //                     handleChange(e)
//                         //                     setFormData({
//                         //                         ...formData,
//                         //                         visibility: e.target.value
//                         //                     })
//                         //                 }}
//                         //                     className="border-0 p-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
// <option value="everyone">Everyone</option>
// <option value="connections">Only Connections</option>
// <option value="me">Only Me</option>
//                         //                 </Field> */}
//                         //     </div>
//                         // </div>
//                         // <div className="col-span-2">
//                         //     <div className="w-full flex flex-col gap-2">
//                         //         <label className="block uppercase text-gray-600 text-xs font-bold" htmlFor="grid-password">
//                         //             Caption
//                         //         </label>
//                         //         {/* <Field type="text" name="caption" id={'caption'} onChange={(e) => {
//                         //                     handleChange(e)
//                         //                     setFormData({
//                         //                         ...formData,
//                         //                         caption: e.target.value
//                         //                     })
//                         //                 }}
//                         //                     className="border-0 p-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" /> */}
//                         //     </div>
//                         // </div>
// <div className="col-span-2">
//     <div className="w-full flex flex-col gap-2">
//         <label className="block uppercase text-gray-600 text-xs font-bold" htmlFor="grid-password">
//             Tags
//         </label>
//         <input type="text" className={`border-0 p-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ${tags.length >= 3 ? 'focus:ring-gray-400' : ''} w-full ease-linear transition-all duration-150`} value={tagsInput} onChange={e => setTagsInput(pre => e.target.value)} onKeyUp={e => e.key === 'Enter' ? addTags() : null} readOnly={tags.length >= 3 ? true : false} />
//         <div className='flex items-center gap-2 my-2'>
//             {
//                 tags.map((tag, index) => (
//                     <div key={index} className='flex items-center justify-center gap-2 bg-gray-200 rounded-full p-2 text-xs font-semibold text-black'>
//                         #{tag}
//                         <span className='cursor-pointer rounded-full bg-gray-300 p-1' onClick={() => removeTags(tag)}>
//                             <AiOutlineClose />
//                         </span>
//                     </div>
//                 ))
//             }
//         </div>
//     </div>
// </div>
//                     }
// <div className='col-span-2'>
//     <Tabs defaultIndex={0}>
//         <TabList>
//             <Tab>Text</Tab>
//             <Tab>Image</Tab>
//             <Tab>Videos</Tab>
//         </TabList>
//         <TabPanel>
//             <textarea value={formik.values.firstName} onChange={formik.handleChange} rows={6} placeholder='Share your feelings' className='w-full rounded-lg p-4 outline-none border-0'>
//             </textarea>
//         </TabPanel>
//         <TabPanel>
//             {/* <ImageUploader image={image} setImage={setImage} setIsImageChange={setIsImageChange} mode="full" /> */}
//         </TabPanel>
//         <TabPanel>
//             {/* <VideoUploader video={video} setVideo={setVideo} /> */}
//         </TabPanel>
//     </Tabs>
// </div>
//                 </div>
//             </div>
// <button type='submit' className="bg-black text-white hover:bg-gray-100 hover:text-black hover:border hover:border-black font-bold uppercase text-xs py-2 rounded shadow hover:shadow-md outline-none ease-linear transition-all duration-150">
//     Upload
// </button>
//         </form>
//         //     )}
//         // </Formik>
//     )
// }

// export default CreateFBPost
import React from 'react';
import { useFormik } from 'formik';
import { Context } from '@/context/Context';
import { AiOutlineClose } from '@/data/icons/icons';
import MediaUploader from '../MediaUploader';

const CreateFBPost = () => {
    const { isAuthenticated, isAccessToken, accessToken } = React.useContext(Context)

    const [tagsInput, setTagsInput] = React.useState('')
    const [tags, setTags] = React.useState([])
    const [media, setMedia] = React.useState({
        image: [],
        videos: [],
        pdf: []
    })
    const [formData, setFormData] = React.useState({})

    const formik = useFormik({
        initialValues: {
            caption: '',
            visibility: 'me',
        },
        onSubmit: () => {
            alert(JSON.stringify(formData))
        },
    });

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

    return (
        <form onSubmit={formik.handleSubmit}
            onKeyDown={(e) => {
                e.key === 'Enter' ? e.preventDefault() : null;
            }}
            className="flex flex-col justify-between divide-y-2 gap-4 divide-gray-300 first:divide-y-0 px-4 lg:px-10 py-10 overflow-y-scroll h-[80vh]">
            <div className='flex flex-col justify-start gap-8 pt-4 first:pt-0 h-full'>
                <h6 className="text-gray-400 text-sm font-bold uppercase">
                    Post Details
                </h6>
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <div className="w-full flex flex-col gap-2">
                            <label className="block uppercase text-gray-600 text-xs font-bold" htmlFor="grid-password">
                                Caption
                            </label>
                            <textarea
                                name="caption"
                                rows="7"
                                className='border-0 p-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                                onChange={(e) => {
                                    formik.handleChange(e)
                                    setFormData({
                                        ...formData,
                                        caption: e.target.value
                                    })
                                }}
                                value={formik.values.caption}
                            />
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="w-full flex flex-col gap-2">
                            <label className="block uppercase text-gray-600 text-xs font-bold" htmlFor="grid-password">
                                Visibility
                            </label>
                            <select name='visibility' onChange={(e) => {
                                formik.handleChange(e)
                                setFormData({
                                    ...formData,
                                    visibility: e.target.value
                                })
                            }} value={formik.values.visibility}
                                className='border-0 p-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'>
                                <option value="everyone">Everyone</option>
                                <option value="connections">Only Connections</option>
                                <option value="me">Only Me</option>
                            </select>
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
                </div>
                <div className='col-span-2'>
                    <MediaUploader formData={formData} setFormData={setFormData} media={media} setMedia={setMedia} />
                    {console.log("media", media, "media length", media.length)}
                </div>
                <button type='submit' className="bg-black text-white hover:bg-gray-100 hover:text-black hover:border hover:border-black font-bold uppercase text-xs py-2 rounded shadow hover:shadow-md outline-none ease-linear transition-all duration-150">
                    Upload
                </button>
            </div>
        </form>
    );
};
export default CreateFBPost