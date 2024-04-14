"use client"
import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import { Avatar } from '@/components/ui/avatar';
import Image from 'next/image';
import Link from 'next/link';
import { BiSend, IoChatbubbleOutline, FiEdit, FiTrash } from '@/data/icons/icons'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { ReloadIcon } from '@radix-ui/react-icons'
import { DateTimeParser } from '@/utils'
import { Form, Formik } from "formik";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { DataContext } from '@/context/DataContext';

const Comment = ({ feed, feedIndex }) => {
    const { accessToken } = React.useContext(AuthContext)

    const { data, setData } = React.useContext(DataContext)

    const [loading, setLoading] = React.useState(data.comments?.feedpost?.[`${feed.id}`] !== undefined ? false : true)

    React.useEffect(() => {
        const handler = async () => {
            await FetchComments(accessToken, feed.id, setData)
            setLoading(false)
        }
        handler();
    }, [])

    return loading ? "Loading..." : <DialogDescription>
        <ScrollArea className="h-[300px] pt-4 pb-2 pr-4">
            {
                data.comments.feedPost[`${feed.id}`].map((item, index) => {
                    return <CommentItem key={index} commentItem={item} commentIndex={index} reply={false} feedIndex={feedIndex} feed={feed} replyIndex={null} />
                })
            }
        </ScrollArea>
        <CommentForm feed={feed} feedIndex={feedIndex} />
    </DialogDescription>
}

const CommentItem = ({ commentItem, commentIndex, reply, feedIndex, replyIndex, feed }) => {
    const { accessToken, userData } = React.useContext(AuthContext)
    const { setData } = React.useContext(DataContext)

    return (
        <div className={'flex flex-col items-center justify-between gap-4 mb-4 last:mb-0'}>
            <div className={`flex items-center justify-between w-full relative ${reply && 'pr-[2.4rem]'}`}>
                <div className='flex items-start gap-2'>
                    <Avatar className="w-8 h-8">
                        <Image src={commentItem.uploader.image || '/image/user.png'} width={32} height={32} alt={''} />
                    </Avatar>
                    <div className="space-y-1">
                        <Link href={`/user/${commentItem.uploader.username}`}
                            className="text-sm font-semibold">{commentItem.uploader.name}</Link>
                        <p className="text-xs">
                            {commentItem.comment}
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground gap-4">
                            <div>{commentItem.createdAt}</div>
                            {
                                !reply && <ReplyModal comment={commentItem} feedIndex={feedIndex} commentIndex={commentIndex} feed={feed} />
                            }
                            {
                                commentItem.self && <EditCommentModal comment={commentItem} commentIndex={commentIndex} replyIndex={replyIndex} reply={reply} feed={feed} />
                            }
                            {
                                commentItem.self && <div className='flex cursor-pointer' onClick={() => DeleteComment(accessToken, commentItem, setData, commentIndex, replyIndex, reply, feed, feedIndex, userData)}>
                                    <FiTrash className='text-sm' />
                                    <span>
                                        Delete
                                    </span>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {
                commentItem.children ? <div className={'ml-20 w-full'}>
                    {
                        commentItem.children.map((item, index) => {
                            return <CommentItem commentItem={item} key={index} commentIndex={commentIndex} replyIndex={index} feed={feed} feedIndex={feedIndex} reply={true} />
                        })
                    }
                </div> : null
            }
        </div>
    )
}

const CommentForm = ({ feed, feedIndex }) => {
    const [loading, setLoading] = React.useState(false)

    const { accessToken, userData } = React.useContext(AuthContext)

    const { setData } = React.useContext(DataContext)

    return (
        <Formik initialValues={{
            comment: ''
        }} onSubmit={async values => {
            await CreateComment(accessToken, values.comment, feed.id, setData, setLoading, feedIndex, userData)
            values.comment = ''
        }}>
            {({ values, handleChange, handleSubmit }) => (
                <Form className='flex flex-col gap-2 pt-4'>
                    <Textarea placeholder="Add a comment..." rows="3" value={values.comment} name={'comment'}
                        onChange={e => handleChange(e)}
                        class="w-full border rounded-md p-2 bg-transparent focus:outline-none focus:ring-0 focus-visible:ring-0" />
                    {
                        loading ? <Button disabled className="gap-2">
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </Button> : <Button className="gap-2"
                            onClick={handleSubmit}>
                            <BiSend className='text-base' />
                            <span>Submit</span>
                        </Button>
                    }
                </Form>
            )}
        </Formik>
    )
}

const ReplyModal = ({ comment, feedIndex, commentIndex, feed }) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const { accessToken, userData } = React.useContext(AuthContext)
    const { setData } = React.useContext(DataContext)

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>
                <div className='flex justify-center items-center gap-1'>
                    <IoChatbubbleOutline className='text-sm' />
                    <span className='text-xs'>Reply</span>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Reply</DialogTitle>
                    <DialogDescription>
                        <Formik initialValues={{
                            comment: ''
                        }} onSubmit={async (values) => await CreateReply(accessToken, values.comment, comment, setData, setLoading, setIsOpen, feedIndex, commentIndex, feed, userData)}>
                            {({ values, handleChange, handleSubmit }) => (
                                <Form className='flex flex-col gap-2 pt-4'>
                                    <Textarea placeholder="Add a comment..." rows="3" name={'comment'}
                                        value={values.comment}
                                        onChange={e => handleChange(e)}
                                        class="w-full border rounded-md p-2 bg-transparent focus:outline-none focus:ring-0 focus-visible:ring-0" />
                                    {
                                        loading ? <Button disabled className="gap-2">
                                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                            Please wait
                                        </Button> :
                                            <Button className="gap-2"
                                                type={"submit"}
                                                onClick={handleSubmit}>
                                                <BiSend className='text-base' />
                                                <span>Submit</span>
                                            </Button>
                                    }
                                </Form>
                            )}
                        </Formik>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

const EditCommentModal = ({ comment, commentIndex, replyIndex, reply, feed }) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const { accessToken } = React.useContext(AuthContext)

    const { setData } = React.useContext(DataContext)

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>
                <div className='flex justify-center items-center gap-1'>
                    <FiEdit className='text-sm' />
                    <span className='text-xs'>Edit</span>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Reply</DialogTitle>
                    <DialogDescription>
                        <Formik initialValues={{
                            comment: comment.comment
                        }}
                            onSubmit={async values => await EditComment(accessToken, values.comment, comment, setLoading, setIsOpen, setData, commentIndex, replyIndex, reply, feed)}>
                            {
                                ({ values, handleChange, handleSubmit }) => (
                                    <Form className='flex flex-col gap-2 pt-4'>
                                        <Textarea placeholder="Add a comment..." rows="3" name={'comment'}
                                            value={values.comment}
                                            onChange={e => handleChange(e)}
                                            class="w-full border rounded-md p-2 bg-transparent focus:outline-none focus:ring-0 focus-visible:ring-0" />
                                        {
                                            loading ? <Button disabled className="gap-2">
                                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                                Please wait
                                            </Button> :
                                                <Button className="gap-2"
                                                    type={"submit"}
                                                    onClick={handleSubmit}>
                                                    <BiSend className='text-base' />
                                                    <span>Submit</span>
                                                </Button>
                                        }
                                    </Form>
                                )
                            }
                        </Formik>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

const EditComment = async (accessToken, value, comment, setLoading, setIsOpen, setData, commentIndex, replyIndex, reply, feed) => {
    setLoading(() => true)
    const options = {
        method: 'POST',
        url: `${process.env.BASE_API_URL}/feed/editcomment/${comment.id}/`,
        headers: {
            Authorization: `JWT ${accessToken}`,
        },
        data: {
            comment: value,
        }
    };
    await axios.request(options)
        .then(response => {
            setData(prevData => {
                let newData = { ...prevData };
                if (reply) {
                    newData.comments.feedPost[`${feed.id}`][commentIndex].children[replyIndex].comment = response.data.comment;
                } else {
                    newData.comments.feedPost[`${feed.id}`][commentIndex].comment = response.data.comment;
                }
                return newData;
            })
        })
        .finally(() => {
            setLoading(() => false)
            setIsOpen(() => false)
        })
}

const CreateReply = async (accessToken, value, comment, setData, setLoading, setIsOpen, feedIndex, commentIndex, feed, userData) => {
    setLoading(() => true)
    const options = {
        method: 'POST',
        url: `${process.env.BASE_API_URL}/feed/createcomment/${feed.id}/`,
        headers: {
            Authorization: `JWT ${accessToken}`,
        },
        data: {
            comment: value,
            master: comment.id,
            createdAt: DateTimeParser(Date.now()),
        }
    };
    await axios.request(options)
        .then(response => {
            setData(prevData => {
                let newData = { ...prevData };
                newData.comments.feedPost[`${feed.id}`][commentIndex].children = [response.data.comment, ...newData.comments.feedPost[`${feed.id}`][commentIndex].children];
                newData.feedPost[decodeURIComponent(userData.username)][feedIndex].commentNo = response.data.commentNo;
                return newData;
            })
        })
        .finally(() => {
            setLoading(() => false)
            setIsOpen(() => false)
        })
}

const CreateComment = async (accessToken, comment, postId, setData, setLoading, feedIndex, userData) => {
    setLoading(pre => true)
    const options = {
        method: 'POST',
        url: `${process.env.BASE_API_URL}/feed/createcomment/${postId}/`,
        headers: {
            Authorization: `JWT ${accessToken}`,
        },
        data: {
            comment: comment,
            createdAt: DateTimeParser(Date.now()),
        }
    };
    await axios.request(options)
        .then(response => {
            setData(prevData => {
                let newData = { ...prevData };
                newData.comments.feedPost[`${postId}`] = [response.data.comment, ...newData.comments.feedPost[`${postId}`]];
                newData.feedPost[decodeURIComponent(userData.username)][feedIndex].commentNo = response.data.commentNo;
                return newData;
            })
        })
        .catch(error => {
        });
    setLoading(pre => false)
}

const DeleteComment = async (accessToken, comment, setData, commentIndex, replyIndex, reply, feed, feedIndex, userData) => {
    const options = {
        method: 'DELETE',
        url: `${process.env.BASE_API_URL}/feed/editcomment/${comment.id}/`,
        headers: {
            Authorization: `JWT ${accessToken}`,
        }
    };
    await axios.request(options)
        .then(response => {
            setData(prevData => {
                let newData = { ...prevData };
                if (reply) {
                    delete newData.comments.feedPost[`${feed.id}`][commentIndex].children[replyIndex];
                } else {
                    delete newData.comments.feedPost[`${feed.id}`][commentIndex];
                }
                newData.feedPost[decodeURIComponent(userData.username)][feedIndex].commentNo = response.data.commentNo;
                return newData;
            })
        })
}

const FetchComments = async (accessToken, postId, setData) => {
    const options = {
        method: 'GET',
        url: `${process.env.BASE_API_URL}/feed/viewcomment/${postId}/`,
        headers: {
            Authorization: `JWT ${accessToken}`
        }
    };

    await axios.request(options)
        .then(response => {
            setData(prevData => {
                return {
                    ...prevData,
                    comments: {
                        feedPost: {
                            [`${postId}`]: response.data
                        }
                    }
                };
            })
        })
        .catch(error => { });
}

export default Comment