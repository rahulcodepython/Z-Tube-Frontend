import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { analytics } from '@/lib/firebase/config';
import { toast } from 'react-toastify';

export const Decrypt = (token, key) => {
    let decryptedToken = '';
    for (let i = 0; i < token?.length; i++) {
        decryptedToken += String.fromCharCode(token.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return decryptedToken;
}

export const Encrypt = (token, key) => {
    let encryptedToken = '';
    for (let i = 0; i < token?.length; i++) {
        encryptedToken += String.fromCharCode(token.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return encryptedToken;
}

export const AddTagsCreateFeed = (tagsInput, setTagsInput, tags, setTags) => {
    if (tagsInput.trim().length > 0) {
        if (!tags.includes(tagsInput)) {
            setTags(pre => [...pre, tagsInput])
        }
    }
    setTagsInput(pre => '')
}

export const RemoveTagsCreateFeed = (tag, setTags) => {
    setTags(pre => pre.filter(t => t !== tag))
}

export const AddTagsEditProfile = (userTagsInput, userTags, profileData, formData, setFormData, setUserTags, setUserTagsInput) => {
    if (userTagsInput.trim().length > 0) {
        if (!userTags.includes(userTagsInput)) {
            JSON.stringify(profileData?.tags) === JSON.stringify([...userTags, userTagsInput]) ?
                delete formData.tags
                : setFormData({
                    ...formData,
                    tags: [...userTags, userTagsInput],
                })
            setUserTags(pre => [...pre, userTagsInput])
        }
    }
    setUserTagsInput(pre => '')
}

export const RemoveTagsEditProfile = (userTags, setUserTags, formData, setFormData) => {
    if (userTags.filter(t => t !== tag).length > 0) {
        setFormData({
            ...formData,
            tags: JSON.stringify(userTags.filter(t => t !== tag)),
        })
    }
    else {
        delete formData.tags
    }
    setUserTags(pre => pre.filter(t => t !== tag))
}

export const OnModalCloseEditProfile = (setIsOpen, setFormData, setUserImage, profileData, setbannerImage, setUserTagsInput, setUserTags) => {
    setIsOpen(pre => false)
    setFormData({})
    setUserImage(pre => profileData.image ? [{ data_url: profileData.image }] : [])
    setbannerImage(pre => profileData.banner ? [{ data_url: profileData.banner }] : [])
    setUserTagsInput(pre => '')
    setUserTags(pre => profileData.tags)
}

export const DateTimeParser = (timestamp) => {
    const date = new Date(timestamp);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const twelveHourFormat = hours % 12 || 12;

    const formattedTime = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} at ${twelveHourFormat}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
    return formattedTime;
}

export const TimeParser = (time) => {
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

export const VerifyToken = async (token) => {
    try {
        await axios.post(`${process.env.BACKEND_DOMAIN_NAME}/auth/token/jwt/verify/`, { "token": token })
        return true
    } catch (error) {
        return false
    }
}

export const FetchUserData = async (token, setIsUserData, setUserData) => {
    const option = {
        headers: {
            Authorization: `JWT ${token}`
        }
    };

    await axios.get(`${process.env.BACKEND_DOMAIN_NAME}/auth/me/`, option)
        .then(response => {
            setIsUserData(pre => true);
            setUserData(pre => response.data);
            sessionStorage.setItem("user", Encrypt(JSON.stringify(response.data), process.env.ENCRYPTION_KEY));
        })
}

export const AuthenticateUser = async (access, refresh, user_data, setIsAuthenticated, setIsAccessToken, setIsRefreshToken, setAccessToken, setRefreshToken, setIsUserData, setUserData) => {
    setIsAuthenticated(pre => true);
    setIsAccessToken(pre => true);
    setAccessToken(pre => access);
    setIsRefreshToken(pre => true);
    setRefreshToken(pre => refresh);
    setIsUserData(pre => true);
    setUserData(pre => JSON.parse(user_data))
}

export const ValidateUser = async (access, refresh, setIsAuthenticated, setIsAccessToken, setIsRefreshToken, setAccessToken, setRefreshToken) => {
    setIsAuthenticated(pre => true);
    setIsAccessToken(pre => true);
    setAccessToken(pre => access);
    setIsRefreshToken(pre => true);
    setRefreshToken(pre => refresh);
    sessionStorage.setItem('access', Encrypt(access, process.env.ENCRYPTION_KEY));
    localStorage.setItem('refresh', Encrypt(refresh, process.env.ENCRYPTION_KEY));
}

export const RevalidateAccessToken = async (token) => {
    await axios.post(`${process.env.BACKEND_DOMAIN_NAME}/auth/token/jwt/refresh/`, { "refresh": token })
        .then(async response => {
            await ValidateUser(response.data.access, response.data.refresh, setIsAuthenticated, setIsAccessToken, setIsRefreshToken, setAccessToken, setRefreshToken);
        })
}

export const LogoutUser = async (setIsAuthenticated, setIsAccessToken, setIsRefreshToken, setIsUserData, setAccessToken, setRefreshToken, setUserData) => {
    setIsAuthenticated(pre => false);
    setIsAccessToken(pre => false);
    setAccessToken(pre => null);
    setIsRefreshToken(pre => false);
    setRefreshToken(pre => null);
    setIsUserData(pre => false)
    setUserData(pre => null)
    sessionStorage.removeItem('access');
    localStorage.removeItem('refresh');
    sessionStorage.removeItem('user');
}

export const AutoLoginUser = async (email, password, setIsValidated, setIsAuthenticated, setIsAccessToken, setIsRefreshToken, setAccessToken, setRefreshToken, setIsUserData, setUserData) => {
    const values = {
        "email": email,
        "password": password
    }

    await axios.post(`${process.env.BACKEND_DOMAIN_NAME}/auth/token/jwt/create/`, values)
        .then(async response => {
            await ValidateUser(response.data.access, response.data.refresh, setIsAuthenticated, setIsAccessToken, setIsRefreshToken, setAccessToken, setRefreshToken)
            setIsValidated(pre => true)
            localStorage.removeItem('email')
            localStorage.removeItem('password')
        })
        .catch(async error => {
            await LogoutUser(setIsAuthenticated, setIsAccessToken, setIsRefreshToken, setIsUserData, setAccessToken, setRefreshToken, setUserData)
            setIsValidated(pre => false)
        });
}

export const FetchFeedPost = async (isAccessToken, accessToken, setFeedPost, username) => {
    if (isAccessToken) {
        const options = {
            headers: {
                Authorization: `JWT ${accessToken}`
            }
        };

        await axios.get(`${process.env.BACKEND_DOMAIN_NAME}/feed/posts/${username}/`, options)
            .then(response => {
                setFeedPost(pre => response.data)
            })
            .catch(error => { });
    }
    else {
        toast.warn("Access token is not valid");
    }
}

export const UploadMediaFiles = async (item, uploadFilePath) => {
    let url;
    const fileref = ref(analytics, uploadFilePath);
    const response = await uploadBytes(fileref, item);
    url = await getDownloadURL(response.ref);
    return url;
};

export const CreateFeedPost = async (media, setUploading, isAccessToken, accessToken, caption, tags, visibility, setIsOpen) => {
    if (isAccessToken) {
        if (media.length > 0) {
            setUploading(pre => true)

            const option = {
                headers: {
                    Authorization: `JWT ${accessToken}`,
                }
            }

            const HandleTostify = new Promise(async (resolve, rejected) => {
                let mediaURL = [];
                await Promise.all(media.map(async (item) => {
                    if (item.type.includes('image/') || item.type.includes('video/')) {
                        const url = await UploadMediaFiles(item, `Feed/${item.name}`);
                        mediaURL.push(JSON.stringify({
                            type: item.type,
                            url: url
                        }));
                    }
                }));
                await axios.post(`${process.env.BACKEND_DOMAIN_NAME}/feed/createpost/`, {
                    caption: caption,
                    tags: tags,
                    visibility: visibility,
                    media: mediaURL,
                    createdAt: DateTimeParser(Date.now())
                }, option)
                    .then(response => {
                        resolve();
                        setIsOpen(pre => false)
                        setUploading(pre => false)
                    })
                    .catch(error => {
                        rejected()
                        setUploading(pre => false)
                        setIsOpen(pre => false)
                    })
            })

            toast.promise(
                HandleTostify,
                {
                    pending: 'Your request is on process.',
                    success: 'You post is uploaded.',
                    error: 'There is some issue, Try again.'
                }
            )
        }
        else {
            toast.warn("You can not upload without any media file.")
        }
    }
    else {
        toast.warn("Access token is not valid.");
    }
}

export const FetchProfileData = async (params, userData, isProfileData, setProfile, profileData, isAccessToken, accessToken, setIsProfileData, setProfileData) => {
    if (decodeURIComponent(params.username) === userData?.username && isProfileData) {
        setProfile(pre => profileData)
    }
    else {
        if (isAccessToken) {
            const option = {
                headers: {
                    Authorization: `JWT ${accessToken}`
                },
            }

            await axios.get(`${process.env.BACKEND_DOMAIN_NAME}/auth/profile/${params.username}/`, option)
                .then(response => {
                    if (response.data.self) {
                        setIsProfileData(pre => true)
                        setProfileData(pre => response.data)
                    }
                    setProfile(pre => response.data)
                })
                .catch(error => {
                    setProfile(pre => null)
                    toast.warn("There is some issue.")
                })
        }
        else {
            toast.warn("Access token is not valid.")
        }
    }
}

export const ConnectPeople = async (accessToken, username, profile, setProfile) => {
    const option = {
        headers: {
            Authorization: `JWT ${accessToken}`
        },
    }

    await axios.get(`${process.env.BACKEND_DOMAIN_NAME}/auth/connect/${username}/`, option)
        .then(response => setProfile({ ...profile, isFriend: true }))
}

export const DisconnectPeople = async (accessToken, username, profile, setProfile) => {
    const option = {
        headers: {
            Authorization: `JWT ${accessToken}`
        },
    }

    await axios.delete(`${process.env.BACKEND_DOMAIN_NAME}/auth/connect/${username}/`, option)
        .then(response => setProfile({ ...profile, isFriend: false }))
}

export const UpdateProfile = async (isAccessToken, accessToken, isUserImageChange, isBannerImageChange, userImage, bannerImage, formData, setIsProfileData, setProfileData, setIsUserData, setUserData, setProfile, router, onModalClose, setIsUpdating) => {
    if (isAccessToken) {
        setIsUpdating(pre => true)

        const option = {
            headers: {
                Authorization: `JWT ${accessToken}`,
            }
        }

        const HandleTostify = new Promise(async (resolve, rejected) => {
            const userImageData = isUserImageChange ? {
                image: await UploadMediaFiles(userImage[0].file, `User/DP/${userImage[0].file.name}`)
            } : null
            const bannerImageData = isBannerImageChange ? {
                banner: await UploadMediaFiles(bannerImage[0].file, `User/Banner/${bannerImage[0].file.name}`)
            } : null

            await axios.patch(`${process.env.BACKEND_DOMAIN_NAME}/auth/profile/`, {
                ...formData,
                ...userImageData,
                ...bannerImageData
            }, option)
                .then(async response => {
                    setIsProfileData(pre => true)
                    setProfileData(pre => response.data.profile)
                    setIsUserData(pre => true)
                    setUserData(pre => response.data.user)
                    setProfile(pre => response.data.profile)
                    sessionStorage.removeItem("user")
                    sessionStorage.setItem("user", Encrypt(JSON.stringify(response.data.user), process.env.ENCRYPTION_KEY));
                    resolve();
                    onModalClose()
                    setIsUpdating(pre => false)
                    router.push(`/admin/${encodeURIComponent(response.data.user.username)}`)
                })
                .catch((error) => {
                    rejected();
                    setIsUpdating(pre => false)
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
    else {
        toast.warn("Access token is not valid.")
    }
}

export const CheckUsername = async (e, profileData, setIsUsernameValid, formData, isAccessToken, accessToken, setFormData) => {
    if (e.target.value === profileData?.username) {
        setIsUsernameValid(pre => true)
        delete formData?.username
    }
    else {
        if (isAccessToken) {
            const option = {
                headers: {
                    Authorization: `JWT ${accessToken}`,
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
                    delete formData?.username
                })
        }
        else {
            toast.warn("Access token is not valid.")
        }
    }
}

export const Login = async (values, router, setIsAuthenticated, setIsAccessToken, setIsRefreshToken, setAccessToken, setRefreshToken) => {
    const HandleTostify = new Promise((resolve, rejected) => {
        axios.post(`${process.env.BACKEND_DOMAIN_NAME}/auth/token/jwt/create/`, values)
            .then(async response => {
                await ValidateUser(response.data.access, response.data.refresh, setIsAuthenticated, setIsAccessToken, setIsRefreshToken, setAccessToken, setRefreshToken)
                router.push("/")
                resolve();
            })
            .catch(error => {
                rejected();
            });
    });

    toast.promise(
        HandleTostify,
        {
            pending: 'Your request is on process.',
            success: 'Your are logged in.',
            error: 'There is some issue, Try again.'
        }
    )
}

export const Register = async (values) => {
    const HandleTostify = new Promise((resolve, rejected) => {
        axios.post(`${process.env.BACKEND_DOMAIN_NAME}/auth/dj/users/`, values)
            .then((response) => {
                localStorage.setItem("email", values.email)
                localStorage.setItem("password", Encrypt(values.password, process.env.ENCRYPTION_KEY))
                resolve();
            })
            .catch((error) => {
                rejected();
            });
    });

    toast.promise(
        HandleTostify,
        {
            pending: 'Your request is on process.',
            success: 'Your request is accepted.',
            error: 'Your request is denied.'
        }
    )
}

export const CreateComment = async (isAccessToken, accessToken, comment, postid, setComments, setLoading) => {
    if (isAccessToken) {
        setLoading(pre => true)
        const option = {
            headers: {
                Authorization: `JWT ${accessToken}`,
            }
        };

        await axios.post(`${process.env.BACKEND_DOMAIN_NAME}/feed/createcomment/${postid}/`, {
            comment: comment,
            createdAt: DateTimeParser(Date.now()),
        }, option)
            .then(response => {
                setComments(pre => [...pre, response.data]);
            })
            .catch(error => { });
        setLoading(pre => false)
    }
    else {
        toast.warn("Access token is not valid.")
    }
}

export const FetchComments = async (isAccessToken, accessToken, postid, setComments) => {
    if (isAccessToken) {
        const options = {
            headers: {
                Authorization: `JWT ${accessToken}`
            }
        };

        await axios.get(`${process.env.BACKEND_DOMAIN_NAME}/feed/viewcomment/${postid}/`, options)
            .then(response => {
                setComments(pre => response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }
    else {
        toast.warn("Access token is not valid.")
    }
}