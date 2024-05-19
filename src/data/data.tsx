import { HiUsers, HiSpeakerphone } from 'react-icons/hi'
import { FaFilePen, FaIndianRupeeSign, FaGear } from 'react-icons/fa6'
import { FaRedditAlien, FaPlaceOfWorship } from 'react-icons/fa'
import { BsTwitter, BsDiscord, BsFillBookmarkFill, BsSteam, BsMusicNoteBeamed, BsFillQuestionCircleFill } from 'react-icons/bs'
import { AiFillYoutube, AiFillFacebook, AiFillInstagram, AiFillHome, AiFillStar, AiOutlineRadarChart, AiOutlineStop } from 'react-icons/ai'
import { PiHandbagSimpleFill, PiSignIn, PiShareFatLight, PiTelevisionBold } from 'react-icons/pi'
import { BiSolidBookContent, BiSolidInbox, BiBell, BiSolidHot, BiWorld, BiCodeAlt, BiLogOut, BiTimeFive } from 'react-icons/bi'
import { MdLibraryAdd, MdSubscriptions, MdBusiness, MdSportsVolleyball, MdFastfood, MdLocalMovies, MdPlace, MdScience, MdPrivacyTip, MdPlaylistAdd, MdOutlinedFlag, MdOutlineShoppingCart, MdPassword, MdOutlineMarkEmailRead } from 'react-icons/md'
import { LuHistory } from 'react-icons/lu'
import { VscLaw } from 'react-icons/vsc'
import { GiAmpleDress, GiWhiteBook, GiLaptop } from 'react-icons/gi'
import { LiaSignatureSolid } from 'react-icons/lia'
import { TbLetterZ } from "react-icons/tb";
import { IoMdRemoveCircleOutline, } from "react-icons/io";
import React from "react";

interface emoji {
    id: number,
    icon: string,
    name: string,
}

export interface sidebarItem {
    icon: React.ReactNode,
    title: string,
    link: string,
}

interface navbarItems {
    title: string,
    link: string,
}

interface videos {
    id: string,
    thumbnail: string,
    uploaderImage: string,
    title: string,
    uploaderName: string,
    views: number,
    time: string,
    videoLink: string,
    duration: string
}

interface menuInterface {
    title: string
    icon: React.ReactNode,
}

interface productCategory {
    key: string,
    title: string

}[]

interface Data {
    emoji: Array<emoji>
    sidebar: {
        social: Array<sidebarItem>
        explore: Array<sidebarItem>
        topic: Array<sidebarItem>
        recources: Array<sidebarItem>
    }
    ecom: {
        navbarItems: Array<navbarItems>
        productCategory: Array<productCategory>
        productSubCategory: Array<productCategory>
    }
    youtube: {
        allVideos: {
            videos: Array<videos>
            menu: Array<Array<menuInterface>>
        }
    },
    unauthenticatedRoutes: Array<string>
}

const Data: Data = {
    emoji: [
        { id: 0, icon: '/svg/like.svg', name: 'Like' },
        { id: 1, icon: '/svg/heart.svg', name: 'Love' },
        { id: 2, icon: '/svg/care.svg', name: 'Care' },
        { id: 3, icon: '/svg/laugh.svg', name: 'Smile' },
        { id: 4, icon: '/svg/wow.svg', name: 'Wow' },
        { id: 5, icon: '/svg/cry.svg', name: 'Cry' },
        { id: 6, icon: '/svg/angry.svg', name: 'Angry' },
    ],
    sidebar: {
        social: [
            {
                icon: <AiFillHome />,
                title: "Home",
                link: '/',
            },
            {
                icon: <AiFillYoutube />,
                title: "YouTube",
                link: '/user/youtube'
            },
            {
                icon: <AiFillFacebook />,
                title: "Facebook",
                link: '/facebook'
            },
            {
                icon: <AiFillInstagram />,
                title: "Instagram",
                link: '/'
            },
            {
                icon: <BsTwitter />,
                title: "Twitter",
                link: '/'
            },
            {
                icon: <FaRedditAlien />,
                title: "Reddit",
                link: '/'
            },
            {
                icon: <BsDiscord />,
                title: "Discord",
                link: '/'
            },
        ],
        explore: [
            {
                icon: <MdLibraryAdd />,
                title: "Library",
                link: '#'
            },
            {
                icon: <LuHistory />,
                title: "History",
                link: '#'
            },
            {
                icon: <BiBell />,
                title: "Notiification",
                link: '#'
            },
            {
                icon: <HiUsers />,
                title: "Users",
                link: '#'
            },
            {
                icon: <BsFillBookmarkFill />,
                title: "Bookmark",
                link: '#'
            },
            {
                icon: <MdSubscriptions />,
                title: "Subscription",
                link: '#'
            },
            {
                icon: <FaIndianRupeeSign />,
                title: "Monetization",
                link: '#'
            },
            {
                icon: <HiSpeakerphone />,
                title: "Advertise",
                link: '#'
            },
            {
                icon: <BiSolidInbox />,
                title: "Inbox",
                link: '#'
            },
            {
                icon: <PiHandbagSimpleFill />,
                title: "eCommerce",
                link: '/ecom'
            },
            {
                icon: <MdOutlineShoppingCart />,
                title: "Cart",
                link: '/ecom/cart'
            }
        ],
        topic: [
            {
                icon: <BiSolidHot />,
                title: "Trending",
                link: '#'
            },
            {
                icon: <BsSteam />,
                title: "Gaming",
                link: '#'
            },
            {
                icon: <MdSportsVolleyball />,
                title: "Sports",
                link: '#'
            },
            {
                icon: <MdBusiness />,
                title: "Business",
                link: '#'
            },
            {
                icon: <AiFillStar />,
                title: "Celebrity",
                link: '#'
            },
            {
                icon: <AiOutlineRadarChart />,
                title: "Art",
                link: '#'
            },
            {
                icon: <PiTelevisionBold />,
                title: "Television",
                link: '#'
            },
            {
                icon: <GiAmpleDress />,
                title: "Fashion",
                link: '#'
            },
            {
                icon: <MdFastfood />,
                title: "Food and Drink",
                link: '#'
            },
            {
                icon: <GiWhiteBook />,
                title: "History",
                link: '#'
            },
            {
                icon: <VscLaw />,
                title: "Law",
                link: '#'
            },
            {
                icon: <BiWorld />,
                title: "Nation",
                link: '#'
            },
            {
                icon: <MdLocalMovies />,
                title: "Movies",
                link: '#'
            },
            {
                icon: <BsMusicNoteBeamed />,
                title: "Music",
                link: '#'
            },
            {
                icon: <LiaSignatureSolid />,
                title: "Books",
                link: '#'
            },
            {
                icon: <FaPlaceOfWorship />,
                title: "Religion",
                link: '#'
            },
            {
                icon: <MdScience />,
                title: "Science",
                link: '#'
            },
            {
                icon: <GiLaptop />,
                title: "Technology",
                link: '#'
            },
            {
                icon: <BiCodeAlt />,
                title: "Programming",
                link: '#'
            },
            {
                icon: <MdPlace />,
                title: "Travel",
                link: '#'
            },
        ],
        recources: [
            {
                icon: <TbLetterZ />,
                title: "About ZTube",
                link: '#'
            },
            {
                icon: <BsFillQuestionCircleFill />,
                title: "Help",
                link: '#'
            },
            {
                icon: <FaGear />,
                title: "Settings",
                link: '#'
            },
            {
                icon: <BiSolidBookContent />,
                title: "Content Policy",
                link: '#'
            },
            {
                icon: <MdPrivacyTip />,
                title: "Privacy Policy",
                link: '#'
            },
            {
                icon: <MdOutlineMarkEmailRead />,
                title: "Update Email",
                link: '/auth/email-update'
            },
            {
                icon: <MdPassword />,
                title: "Update Password",
                link: '/auth/password-update'
            },
            {
                icon: <PiSignIn />,
                title: "Sign In",
                link: "/auth/login"
            },
            {
                icon: <FaFilePen />,
                title: "Sign Up",
                link: "/auth/register"
            },
            {
                icon: <BiLogOut />,
                title: "Logout",
                link: "/auth/logout"
            },
        ]
    },
    ecom: {
        navbarItems: [
            {
                title: "Grocery",
                link: '/ecom/grocery',
            },
            {
                title: "Fashion",
                link: '/ecom/fashion',
            },
            {
                title: "Electronics",
                link: '/ecom/electronics',
            },
            {
                title: "Home & Furniture",
                link: '/ecom/home-furniture',
            },
            {
                title: "Appliances",
                link: '/ecom/appliances',
            },
            {
                title: "Beauty & Toys",
                link: '/ecom/beauty-toys',
            },
        ],
        productCategory: [
            {
                key: 'fashion',
                title: 'Fashion',
            }
        ],
        productSubCategory: [
            {
                key: 't-shirt',
                title: 'T-Shirt',
            },
        ]
    },
    youtube: {
        allVideos: {
            videos: [
                {
                    id: 'video1',
                    thumbnail: '/image/thumbnail.png',
                    uploaderImage: '/image/thumbnail.png',
                    title: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora aliquam eligendi sit!",
                    uploaderName: "Lorem, ipsum",
                    views: 12,
                    time: "45 seconds ago",
                    videoLink: "/video/videoplayback.mp4",
                    duration: "783.6"
                },
                {
                    id: 'video2',
                    thumbnail: '/image/thumbnail.png',
                    uploaderImage: '/image/thumbnail.png',
                    title: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora aliquam eligendi sit!",
                    uploaderName: "Lorem, ipsum",
                    views: 12,
                    time: "45 seconds ago",
                    videoLink: "/video/videoplayback.mp4",
                    duration: "783.6"
                },
                {
                    id: 'video3',
                    thumbnail: '/image/thumbnail.png',
                    uploaderImage: '/image/thumbnail.png',
                    title: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora aliquam eligendi sit!",
                    uploaderName: "Lorem, ipsum",
                    views: 12,
                    time: "45 seconds ago",
                    videoLink: "/video/videoplayback.mp4",
                    duration: "783.6"
                },
                {
                    id: 'video4',
                    thumbnail: '/image/thumbnail.png',
                    uploaderImage: '/image/thumbnail.png',
                    title: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora aliquam eligendi sit!",
                    uploaderName: "Lorem, ipsum",
                    views: 12,
                    time: "45 seconds ago",
                    videoLink: "/video/videoplayback.mp4",
                    duration: "783.6"
                },
                {
                    id: 'video5',
                    thumbnail: '/image/thumbnail.png',
                    uploaderImage: '/image/thumbnail.png',
                    title: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora aliquam eligendi sit!",
                    uploaderName: "Lorem, ipsum",
                    views: 12,
                    time: "45 seconds ago",
                    videoLink: "/video/videoplayback.mp4",
                    duration: "783.6"
                },
                {
                    id: 'video6',
                    thumbnail: '/image/thumbnail.png',
                    uploaderImage: '/image/thumbnail.png',
                    title: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora aliquam eligendi sit!",
                    uploaderName: "Lorem, ipsum",
                    views: 12,
                    time: "45 seconds ago",
                    videoLink: "/video/videoplayback.mp4",
                    duration: "783.6"
                },
                {
                    id: 'video7',
                    thumbnail: '/image/thumbnail.png',
                    uploaderImage: '/image/thumbnail.png',
                    title: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora aliquam eligendi sit!",
                    uploaderName: "Lorem, ipsum",
                    views: 12,
                    time: "45 seconds ago",
                    videoLink: "/video/videoplayback.mp4",
                    duration: "783.6"
                },
                {
                    id: 'video8',
                    thumbnail: '/image/thumbnail.png',
                    uploaderImage: '/image/thumbnail.png',
                    title: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora aliquam eligendi sit!",
                    uploaderName: "Lorem, ipsum",
                    views: 12,
                    time: "45 seconds ago",
                    videoLink: "/video/videoplayback.mp4",
                    duration: "783.6"
                },
                {
                    id: 'video9',
                    thumbnail: '/image/thumbnail.png',
                    uploaderImage: '/image/thumbnail.png',
                    title: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora aliquam eligendi sit!",
                    uploaderName: "Lorem, ipsum",
                    views: 12,
                    time: "45 seconds ago",
                    videoLink: "/video/videoplayback.mp4",
                    duration: "783.6"
                },
                {
                    id: 'video10',
                    thumbnail: '/image/thumbnail.png',
                    uploaderImage: '/image/thumbnail.png',
                    title: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora aliquam eligendi sit!",
                    uploaderName: "Lorem, ipsum",
                    views: 12,
                    time: "45 seconds ago",
                    videoLink: "/video/videoplayback.mp4",
                    duration: "783.6"
                },
                {
                    id: 'video11',
                    thumbnail: '/image/thumbnail.png',
                    uploaderImage: '/image/thumbnail.png',
                    title: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora aliquam eligendi sit!",
                    uploaderName: "Lorem, ipsum",
                    views: 12,
                    time: "45 seconds ago",
                    videoLink: "/video/videoplayback.mp4",
                    duration: "783.6"
                },
                {
                    id: 'video12',
                    thumbnail: '/image/thumbnail.png',
                    uploaderImage: '/image/thumbnail.png',
                    title: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora aliquam eligendi sit!",
                    uploaderName: "Lorem, ipsum",
                    views: 12,
                    time: "45 seconds ago",
                    videoLink: "/video/videoplayback.mp4",
                    duration: "783.6"
                },
                {
                    id: 'video13',
                    thumbnail: '/image/thumbnail.png',
                    uploaderImage: '/image/thumbnail.png',
                    title: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora aliquam eligendi sit!",
                    uploaderName: "Lorem, ipsum",
                    views: 12,
                    time: "45 seconds ago",
                    videoLink: "/video/videoplayback.mp4",
                    duration: "783.6"
                },
            ],
            menu: [
                [
                    {
                        title: 'Save to Watch later',
                        icon: <BiTimeFive />
                    },
                    {
                        title: 'Save to Playlist',
                        icon: <MdPlaylistAdd />
                    },
                    {
                        title: 'Share',
                        icon: <PiShareFatLight />
                    }
                ],
                [
                    {
                        title: 'Not Interested',
                        icon: <AiOutlineStop />
                    },
                    {
                        title: "Don't recomend this channel",
                        icon: <IoMdRemoveCircleOutline />
                    },
                    {
                        title: 'Report',
                        icon: <MdOutlinedFlag />
                    }
                ]
            ]
        },
    },
    unauthenticatedRoutes: [
        '/auth/login',
        '/auth/register',
        '/auth/github',
        '/auth/google',
        '/auth/verify-email',
    ]
}

export default Data