"use client"
import React from 'react'
import Modal from 'react-modal';
import { HiOutlineViewGridAdd } from '@/data/icons/icons'
import { Context } from '@/context/Context';
import { Tooltip } from 'react-tooltip';
import { useRouter } from 'next/navigation';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CreateFBPost from './posts/CreateFBPost';

const CreatePost = () => {
    const { isAuthenticated } = React.useContext(Context)

    const [isOpen, setIsOpen] = React.useState(false);

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
            <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(pre => false)} style={customStyles}>
                <section className="w-full h-[80vh] relative flex flex-col bg-gray-100">
                    <div className="p-4 bg-white text-center flex items-center justify-between shadow-md z-20">
                        <h6 className="text-gray-700 text-xl font-bold">
                            My account
                        </h6>
                        <div className='flex justify-between items-center gap-4'>
                            <button onClick={() => setIsOpen(pre => false)} className="bg-black text-white hover:bg-gray-100 hover:text-black hover:scale-125 hover:border hover:border-black font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none ease-linear transition-all duration-150" type="button">
                                Close
                            </button>
                        </div>
                    </div>
                    <Tabs defaultIndex={0} className="h-full overflow-scroll p-0 bg-red-700">
                        <TabList>
                            <Tab>Facebook</Tab>
                            <Tab>YouTube</Tab>
                            <Tab>Reddit</Tab>
                            <Tab>Twitter</Tab>
                            <Tab>Reels</Tab>
                        </TabList>
                        <TabPanel className="bg-green-600">
                            <CreateFBPost />
                        </TabPanel>
                        <TabPanel></TabPanel>
                        <TabPanel></TabPanel>
                        <TabPanel></TabPanel>
                        <TabPanel></TabPanel>
                    </Tabs>
                    {/* <Tabs defaultIndex={0} className="w-full relative flex flex-col bg-gray-100 overflow-scroll">
                        <TabList className="bg-white flex flex-col z-20 shadow-md">
                            <div className='w-full p-4 text-center flex items-center justify-between'>
                                <h6 className="text-gray-700 text-xl font-bold">
                                    Create Post
                                </h6>
                                <div className='flex justify-between items-center gap-4'>
                                    <button onClick={() => setIsOpen(pre => false)} className="bg-black text-white hover:bg-gray-100 hover:text-black hover:scale-125 hover:border hover:border-black font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none ease-linear transition-all duration-150" type="button">
                                        Close
                                    </button>
                                </div>
                            </div>
                            <nav className='pb-2'>
                                <Tab>Facebook</Tab>
                                <Tab>YouTube</Tab>
                                <Tab>Reddit</Tab>
                                <Tab>Twitter</Tab>
                                <Tab>Reels</Tab>
                            </nav>
                        </TabList>
                        <div className=''>
                            <TabPanel>
                                <CreateFBPost />
                            </TabPanel>
                            <TabPanel></TabPanel>
                            <TabPanel></TabPanel>
                            <TabPanel></TabPanel>
                            <TabPanel></TabPanel>
                        </div>
                    </Tabs> */}
                </section>
            </Modal>
        </div>
    )
}

export default CreatePost