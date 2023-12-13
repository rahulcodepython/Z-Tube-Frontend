"use client"
import React from 'react'
import Modal from 'react-modal';
import { AiOutlineClose, FaCircleCheck, FiEdit } from '@/data/icons/icons'
import { Field, Form, Formik } from 'formik';
import axios from 'axios';
import { Context } from '@/context/Context';
import { toast } from 'react-toastify';
import { analytics } from '@/lib/firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import ImageUploader from '@/app/(index)/(main)/components/client/ImageUploader';
import { Decrypt } from '@/functions/Decrypt';
import { Encrypt } from '@/functions/Encrypt';

const EditProfile = () => {
    const { isAuthenticated, isAccessToken, accessToken, profileData, setProfileData, setIsProfileData, setIsUserData, setUserData } = React.useContext(Context)

    const [isOpen, setIsOpen] = React.useState(false);
    const [userTagsInput, setUserTagsInput] = React.useState('')
    const [userTags, setUserTags] = React.useState(profileData.tags ? JSON.parse(profileData.tags) : [])
    const [formData, setFormData] = React.useState({})
    const [bannerImage, setbannerImage] = React.useState(
        profileData.banner.length > 0 ? [{ data_url: profileData.banner }] : [])
    const [isBannerImageChange, setIsBannerImageChange] = React.useState(false)
    const [userImage, setUserImage] = React.useState(
        profileData.image.length > 0 ? [{ data_url: profileData.image }] : [])
    const [isUserImageChange, setIsUserImageChange] = React.useState(false)
    const [isUsernameValid, setIsUsernameValid] = React.useState(true)

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
        if (userTagsInput.trim().length > 0) {
            if (!userTags.includes(userTagsInput)) {
                setFormData({
                    ...formData,
                    tags: JSON.stringify([...userTags, userTagsInput]),
                })
                setUserTags(pre => [...pre, userTagsInput])
            }
        }
        setUserTagsInput(pre => '')
    }

    const removeTags = (tag) => {
        setFormData({
            ...formData,
            tags: JSON.stringify(userTags.filter(t => t !== tag)),
        })
        setUserTags(pre => pre.filter(t => t !== tag))
    }

    const onModalClose = () => {
        setFormData({})
        setIsOpen(pre => false)
        setUserImage(pre => [profileData.image ? { data_url: profileData.image } : null])
        setbannerImage(pre => [profileData.banner ? { data_url: profileData.banner } : null])
        setUserTagsInput(pre => '')
        setUserTags(pre => profileData.tags ? JSON.parse(profileData.tags) : [])
    }

    const onProfileUpdate = async (response) => {
        setIsProfileData(pre => true)
        setProfileData(pre => response.data.profile)
        setIsUserData(pre => true)
        setUserData(pre => response.data.user)
        sessionStorage.removeItem("user")
        sessionStorage.setItem("user", Encrypt(JSON.stringify(response.data.user), process.env.ENCRYPTION_KEY));
    }

    const userImageUpload = async () => {
        let url = {};
        if (isUserImageChange) {
            const fileref = ref(analytics, `User/DP/${userImage[0].file.name}`)
            await uploadBytes(fileref, userImage[0].file)
                .then(async response => {
                    url = { image: await getDownloadURL(response.ref) }
                })
        }
        return url
    }

    const bannerImageUpload = async () => {
        let url = {}
        if (isBannerImageChange) {
            const fileref = ref(analytics, `User/Banner/${bannerImage[0].file.name}`)
            await uploadBytes(fileref, bannerImage[0].file)
                .then(async response => {
                    url = { banner: await getDownloadURL(response.ref) }
                })
        }
        return url;
    }

    const checkUsernameExists = async (e) => {
        if (e.target.value === profileData?.user?.username) {
            setIsUsernameValid(pre => true)
            delete formData.username
        }
        else {
            console.log("running");

            const option = {
                headers: {
                    Authorization: `JWT ${accessToken}`,
                    "Content-Type": "application/json",
                }
            }

            await axios.post(`${process.env.BACKEND_DOMAIN_NAME}/auth/find/username/`, { "username": e.target.value }, option)
                .then(response => {
                    setIsUsernameValid(pre => true)
                    setFormData({
                        ...formData,
                        username: e.target.value
                    })
                })
                .catch(error => {
                    setIsUsernameValid(pre => false)
                })
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
                <section className="w-full h-[80vh] relative flex flex-col bg-gray-100">
                    <div className="p-4 bg-white text-center flex items-center justify-between shadow-md z-20">
                        <h6 className="text-gray-700 text-xl font-bold">
                            My account
                        </h6>
                        <div className='flex justify-between items-center gap-4'>
                            <button onClick={onModalClose} className="bg-black text-white hover:bg-gray-100 hover:text-black hover:scale-125 hover:border hover:border-black font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none ease-linear transition-all duration-150" type="button">
                                Close
                            </button>
                        </div>
                    </div>
                    <Formik initialValues={{
                        first_name: profileData?.user?.first_name,
                        last_name: profileData?.user?.last_name,
                        username: profileData?.user?.username,
                        isLocked: profileData?.isLocked,
                        bio: profileData?.bio,
                    }}
                        onSubmit={() => {
                            if (isAuthenticated && isAccessToken) {

                                const option = {
                                    headers: {
                                        Authorization: `JWT ${accessToken}`,
                                        "Content-Type": "application/json",
                                    }
                                }

                                const HandleTostify = new Promise(async (resolve, rejected) => {
                                    const uploadedUserImageArray = await userImageUpload();
                                    const uploadedBannerImageArray = await bannerImageUpload();

                                    axios.patch(`${process.env.BACKEND_DOMAIN_NAME}/auth/profile/`, {
                                        ...formData,
                                        ...uploadedUserImageArray,
                                        ...uploadedBannerImageArray
                                    }, option)
                                        .then(async response => {
                                            await onProfileUpdate(response);
                                            resolve();
                                            onModalClose()
                                        })
                                        .catch((error) => {
                                            rejected();
                                            onModalClose()
                                        });
                                });

                                toast.promise(
                                    HandleTostify,
                                    {
                                        pending: 'Your request is on process.',
                                        success: 'You are now updated.',
                                        error: 'There is some issue, Try again.'
                                    }
                                )
                            }
                        }}>
                        {({ values, handleChange, handleSubmit }) => (
                            <Form onKeyDown={(e) => {
                                e.key === 'Enter' ? e.preventDefault() : null;
                            }} className="flex flex-col divide-y-2 gap-4 divide-gray-300 first:divide-y-0 px-4 lg:px-10 py-10 overflow-y-scroll h-[80vh]">
                                <div className='flex flex-col justify-start gap-8 pt-4 first:pt-0'>
                                    <h6 className="text-gray-400 text-sm font-bold uppercase">
                                        Basic Information
                                    </h6>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className='col-span-2 flex flex-col justify-center gap-2'>
                                            <label className="block uppercase text-gray-600 text-xs font-bold" htmlFor="grid-password">
                                                Banner Image
                                            </label>
                                            <ImageUploader image={bannerImage} setImage={setbannerImage} setIsImageChange={setIsBannerImageChange} mode="banner" />
                                        </div>
                                        <div className='col-span-2 flex flex-col justify-center gap-2'>
                                            <label className="block uppercase text-gray-600 text-xs font-bold" htmlFor="grid-password">
                                                User Image
                                            </label>
                                            <ImageUploader image={userImage} setImage={setUserImage} setIsImageChange={setIsUserImageChange} mode="dp" />
                                        </div>
                                        <div className="col-span-1">
                                            <div className="w-full flex flex-col gap-2">
                                                <label className="block uppercase text-gray-600 text-xs font-bold" htmlFor="grid-password">
                                                    First Name
                                                </label>
                                                <Field type="text" name="first_name" id={'first_name'} onChange={(e) => {
                                                    handleChange(e)
                                                    setFormData({
                                                        ...formData,
                                                        first_name: e.target.value
                                                    })
                                                }}
                                                    className="border-0 p-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                            </div>
                                        </div>
                                        <div className="col-span-1">
                                            <div className="w-full flex flex-col gap-2">
                                                <label className="block uppercase text-gray-600 text-xs font-bold" htmlFor="grid-password">
                                                    Last Name
                                                </label>
                                                <Field type="text" name="last_name" id="last_name" onChange={(e) => {
                                                    handleChange(e)
                                                    setFormData({
                                                        ...formData,
                                                        last_name: e.target.value
                                                    })
                                                }}
                                                    className="border-0 p-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                            </div>
                                        </div>
                                        <div className="col-span-1">
                                            <div className="w-full flex flex-col gap-2">
                                                <label className="block uppercase text-gray-600 text-xs font-bold" htmlFor="grid-password">
                                                    Username
                                                </label>
                                                <div className='w-full flex gap-2 justify-center items-center'>
                                                    <Field type="text" name="username" id="username" onChange={(e) => {
                                                        handleChange(e)
                                                        checkUsernameExists(e)
                                                    }}
                                                        className="border-0 p-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                                    <FaCircleCheck className={isUsernameValid ? 'text-green-500' : 'text-red-500'} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-1">
                                            <div className="w-full flex flex-col gap-2">
                                                <label className="block uppercase text-gray-600 text-xs font-bold" htmlFor="grid-password">
                                                    Lock Profile
                                                </label>
                                                <div className='flex gap-4 justify-center items-center'>
                                                    <Field type="checkbox" name="isLocked" id="isLocked" onChange={(e) => {
                                                        handleChange(e)
                                                        setFormData({
                                                            ...formData,
                                                            isLocked: e.target.checked
                                                        })
                                                    }} />
                                                    <span>
                                                        {`${values.isLocked ? 'Locked' : 'Lock'}`}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-2">
                                            <div className="w-full flex flex-col gap-2">
                                                <label className="block uppercase text-gray-600 text-xs font-bold" htmlFor="grid-password">
                                                    About me
                                                </label>
                                                <Field type="text" name="bio" id="bio" onChange={(e) => {
                                                    handleChange(e)
                                                    setFormData({
                                                        ...formData,
                                                        bio: e.target.value
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
                                                <input type="text" className={`border-0 p-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ${userTags.length >= 5 ? 'focus:ring-gray-400' : ''} w-full ease-linear transition-all duration-150`} value={userTagsInput} onChange={e => setUserTagsInput(pre => e.target.value)} onKeyUp={e => e.key === 'Enter' ? addTags() : null} readOnly={userTags.length >= 5 ? true : false} />
                                                <div className='flex items-center gap-2 my-2'>
                                                    {
                                                        userTags.map((tag, index) => (
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
                                </div>
                                <button type='submit' onClick={handleSubmit} className="bg-black text-white hover:bg-gray-100 hover:text-black hover:border hover:border-black font-bold uppercase text-xs py-2 rounded shadow hover:shadow-md outline-none ease-linear transition-all duration-150">
                                    Update
                                </button>
                            </Form>
                        )}
                    </Formik>
                </section>
            </Modal>
        </div>
    )
}

export default EditProfile