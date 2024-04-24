"use client"
import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import { Avatar } from '@/components/ui/avatar';
import Image from 'next/image';
import { Link } from 'next-view-transitions';
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
import { FeedContext } from '@/context/FeedContext';

const Comment = ({ feed, feedIndex }) => {
    const { accessToken } = React.useContext(AuthContext)

    const [comments, setComments] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        const handler = async () => {
            await FetchComments(accessToken, feed.id, setComments, setLoading)
        }
        handler();
    }, [])

    return loading ? "Loading..." : <DialogDescription>
        <ScrollArea className="h-[300px] pt-4 pb-2 pr-4">
            {
                comments.map((item, index) => {
                    return <CommentItem key={index} commentItem={item} commentIndex={index} reply={false} feedIndex={feedIndex} feed={feed} replyIndex={null} setComments={setComments} />
                })
            }
        </ScrollArea>
        <CommentForm setComments={setComments} feed={feed} />
    </DialogDescription>
}

const CommentItem = ({ commentItem, commentIndex, reply, feedIndex, replyIndex, feed, setComments }) => {
    const { accessToken } = React.useContext(AuthContext)
    const { setFeed } = React.useContext(FeedContext)

    return (
        <div className={'flex flex-col items-center justify-between gap-4 mb-4 last:mb-0'}>
            <div className={`flex items-center justify-between w-full relative ${reply && 'pr-[2.4rem]'}`}>
                <div className='flex items-start gap-2'>
                    <Avatar className="w-8 h-8">
                        <Image src={commentItem.uploader.image || '/image/user.png'} width={32} height={32} alt={''} />
                    </Avatar>
                    <div className="space-y-1">
                        <Link href={`/user/${commentItem.uploader.username}`} className="text-sm font-semibold">
                            {commentItem.uploader.name}
                        </Link>
                        <p className="text-xs">
                            {commentItem.comment}
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground gap-4">
                            <div>{commentItem.createdAt}</div>
                            {
                                !reply && <ReplyModal comment={commentItem} commentIndex={commentIndex} feed={feed} feedIndex={feedIndex} setComments={setComments} />
                            }
                            {
                                commentItem.self && <EditCommentModal comment={commentItem} commentIndex={commentIndex} replyIndex={replyIndex} reply={reply} setComments={setComments} />
                            }
                            {
                                commentItem.self && <div className='flex cursor-pointer' onClick={() => DeleteComment(accessToken, commentItem, commentIndex, reply, replyIndex, feedIndex, setFeed, setComments)}>
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
                            return <CommentItem commentItem={item} key={index} commentIndex={commentIndex} replyIndex={index} feed={feed} feedIndex={feedIndex} reply={true} setComments={setComments} />
                        })
                    }
                </div> : null
            }
        </div>
    )
}

const CommentForm = ({ setComments, feed }) => {
    const [loading, setLoading] = React.useState(false)

    const { accessToken } = React.useContext(AuthContext)

    return (
        <Formik initialValues={{
            comment: ''
        }} onSubmit={async (values, actions) => {
            await CreateComment(accessToken, values.comment, feed.id, setLoading, setComments, actions)
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
                        </Button> : <Button type="submit" className="gap-2"
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

const ReplyModal = ({ comment, commentIndex, feed, feedIndex, setComments }) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const { accessToken } = React.useContext(AuthContext)
    const { setFeed } = React.useContext(FeedContext)

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
                        }} onSubmit={async (values) => await CreateReply(accessToken, values.comment, comment, setComments, setLoading, setIsOpen, commentIndex, feed, setFeed, feedIndex)}>
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

const EditCommentModal = ({ comment, commentIndex, replyIndex, reply, setComments }) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const { accessToken } = React.useContext(AuthContext)

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
                    <DialogTitle>Edit</DialogTitle>
                    <DialogDescription>
                        <Formik initialValues={{
                            comment: comment.comment
                        }}
                            onSubmit={async values => await EditComment(accessToken, values.comment, comment, setLoading, setIsOpen, commentIndex, reply, replyIndex, setComments)}>
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

const EditComment = async (accessToken, value, comment, setLoading, setIsOpen, commentIndex, reply, replyIndex, setComments) => {
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
            setComments(pre => {
                let newData = [...pre];
                if (reply) {
                    newData[commentIndex].children[replyIndex].comment = response.data.comment;
                } else {
                    newData[commentIndex].comment = response.data.comment;
                }
                return newData;
            })
        })
        .finally(() => {
            setLoading(() => false)
            setIsOpen(() => false)
        })
}

const CreateReply = async (accessToken, value, comment, setComments, setLoading, setIsOpen, commentIndex, feed, setFeed, feedIndex) => {
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
            setComments(pre => {
                let newData = [...pre];
                newData[commentIndex].children = [response.data.comment, ...newData[commentIndex].children];
                return newData;
            })
            setFeed(pre => {
                let newData = [...pre];
                newData[feedIndex].commentNo = response.data.commentNo;
                return newData;
            })
        })
        .finally(() => {
            setLoading(() => false)
            setIsOpen(() => false)
        })
}

const CreateComment = async (accessToken, comment, postId, setLoading, setComments, actions) => {
    setLoading(() => true)
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
            setComments(pre => [response.data.comment, ...pre])
        }).finally(() => {
            setLoading(() => false)
            actions.resetForm()
        })
}

const DeleteComment = async (accessToken, comment, commentIndex, reply, replyIndex, feedIndex, setFeed, setComments) => {
    const options = {
        method: 'DELETE',
        url: `${process.env.BASE_API_URL}/feed/editcomment/${comment.id}/`,
        headers: {
            Authorization: `JWT ${accessToken}`,
        }
    };

    await axios.request(options)
        .then(response => {
            setComments(pre => {
                let newData = [...pre];
                if (reply) {
                    newData[commentIndex].children = newData[commentIndex].children.filter((_, index) => index !== replyIndex)
                } else {
                    newData = newData.filter((_, index) => index !== commentIndex)
                }
                return newData;
            })
            setFeed(pre => {
                let newData = [...pre];
                newData[feedIndex].commentNo = response.data.commentNo;
                return newData;
            })
        })
}

const FetchComments = async (accessToken, postId, setComments, setLoading) => {
    const options = {
        method: 'GET',
        url: `${process.env.BASE_API_URL}/feed/viewcomment/${postId}/`,
        headers: {
            Authorization: `JWT ${accessToken}`
        }
    };

    await axios.request(options)
        .then(response => {
            setComments(response.data)
        }).finally(() => setLoading(false))
}

export default Comment