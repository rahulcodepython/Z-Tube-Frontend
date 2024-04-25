import { HiUsers, HiSpeakerphone, FaFilePen, FaIndianRupeeSign, FaGear, FaRedditAlien, FaPlaceOfWorship, BsTwitter, BsDiscord, BsFillBookmarkFill, BsSteam, BsMusicNoteBeamed, BsFillQuestionCircleFill, AiFillYoutube, AiFillFacebook, AiFillInstagram, AiFillHome, AiFillStar, AiOutlineRadarChart, PiHandbagSimpleFill, PiSignIn, BiSolidBookContent, BiSolidInbox, BiBell, BiSolidHot, BiWorld, BiCodeAlt, BiLogOut, MdLibraryAdd, MdSubscriptions, MdBusiness, MdSportsVolleyball, MdFastfood, MdLocalMovies, MdPlace, MdScience, MdPrivacyTip, LuHistory, PiTelevisionBold, VscLaw, GiAmpleDress, GiWhiteBook, GiLaptop, LiaSignatureSolid, TbLetterZ, BiTimeFive, MdPlaylistAdd, PiShareFatLight, AiOutlineStop, MdOutlinedFlag, IoMdRemoveCircleOutline, MdOutlineShoppingCart } from '@/data/icons/icons'

export const Data = {
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
                link: '/'
            },
            {
                icon: <AiFillYoutube />,
                title: "YouTube",
                link: '/user/rahulcodepython?tabs=feed'
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
                title: "Shopping",
                link: '#'
            },
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
                title: "Celebraty",
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
    }
}