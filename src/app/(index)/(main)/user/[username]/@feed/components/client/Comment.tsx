"use client"
import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { AccessToken, AuthContext, AuthContextType } from "@/context/AuthContext";
import axios from "axios";
import { Avatar } from '@/components/ui/avatar';
import Image from 'next/image';
import { Link } from 'next-view-transitions';
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
import { FeedContext, FeedContextType, FeedType } from '@/context/FeedContext';
import { FiEdit, FiTrash } from "react-icons/fi";
import { BiSend } from "react-icons/bi";
import { IoChatbubbleOutline } from "react-icons/io5";

interface ReplyType {
    id: string
    master: string
    uploader: {
        username: string
        first_name: string
        last_name: string
        image: string
        is_superuser: boolean
    }
    comment: string
    createdAt: string
    self: boolean
}

interface CommentType {
    id: string
    master: string
    uploader: {
        username: string
        first_name: string
        last_name: string
        image: string
        is_superuser: boolean
    }
    comment: string
    createdAt: string
    self: boolean
    children: Array<ReplyType>
}

const Comment = ({ feed, feedIndex }: { feed: FeedType, feedIndex: number }) => {
    const authContext = React.useContext<AuthContextType | undefined>(AuthContext)
    const accessToken = authContext?.accessToken

    const [comments, setComments] = React.useState<Array<CommentType>>([])
    const [loading, setLoading] = React.useState<boolean>(true)

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
                    return <CommentItem key={index} commentItem={item} commentIndex={index} reply={false}
                        feedIndex={feedIndex} feed={feed} replyIndex={null} setComments={setComments} />
                })
            }
        </ScrollArea>
        <CommentForm setComments={setComments} feed={feed} />
    </DialogDescription>
}

interface CommentItemProps {
    commentItem: CommentType,
    commentIndex: number,
    reply: boolean,
    feedIndex: number,
    replyIndex: number | null,
    feed: FeedType,
    setComments: React.Dispatch<React.SetStateAction<CommentType[]>>
}

const CommentItem = ({
    commentItem,
    commentIndex,
    reply,
    feedIndex,
    replyIndex,
    feed,
    setComments
}: CommentItemProps) => {
    const authContext = React.useContext<AuthContextType | undefined>(AuthContext)
    const accessToken = authContext?.accessToken
    const feedContext = React.useContext<FeedContextType | undefined>(FeedContext)
    const setFeed = feedContext?.setFeed

    return (
        <div className={'flex flex-col items-center justify-between gap-4 mb-4 last:mb-0'}>
            <div className={`flex items-center justify-between w-full relative ${reply && 'pr-[2.4rem]'}`}>
                <div className='flex items-start gap-2'>
                    <Avatar className="w-8 h-8">
                        <Image src={commentItem?.uploader.image || '/image/user.png'} width={32} height={32} alt={''} />
                    </Avatar>
                    <div className="space-y-1">
                        <Link href={`/user/${commentItem.uploader.username}`} className="text-sm font-semibold">
                            {commentItem.uploader.first_name} {commentItem.uploader.last_name}
                        </Link>
                        <p className="text-xs">
                            {commentItem.comment}
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground gap-4">
                            <div>{commentItem.createdAt}</div>
                            {
                                !reply && <ReplyModal comment={commentItem} commentIndex={commentIndex} feed={feed}
                                    feedIndex={feedIndex} setComments={setComments} />
                            }
                            {
                                commentItem.self && <EditCommentModal comment={commentItem} commentIndex={commentIndex}
                                    replyIndex={replyIndex} reply={reply}
                                    setComments={setComments} />
                            }
                            {
                                commentItem.self && <div className='flex cursor-pointer'
                                    onClick={() => DeleteComment(accessToken, commentItem, commentIndex, reply, replyIndex, feedIndex, setFeed, setComments)}>
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
                            return <ReplyItem commentItem={item} key={index} commentIndex={commentIndex}
                                replyIndex={index} feed={feed} feedIndex={feedIndex} reply={true}
                                setComments={setComments} />
                        })
                    }
                </div> : null
            }
        </div>
    )
}

interface ReplyItemProps {
    commentItem: ReplyType,
    commentIndex: number,
    reply: boolean,
    feedIndex: number,
    replyIndex: number | null,
    feed: FeedType,
    setComments: React.Dispatch<React.SetStateAction<CommentType[]>>
}

const ReplyItem = ({
    commentItem,
    commentIndex,
    reply,
    feedIndex,
    replyIndex,
    feed,
    setComments
}: ReplyItemProps) => {
    const authContext = React.useContext<AuthContextType | undefined>(AuthContext)
    const accessToken = authContext?.accessToken
    const feedContext = React.useContext<FeedContextType | undefined>(FeedContext)
    const setFeed = feedContext?.setFeed

    return (
        <div className={'flex flex-col items-center justify-between gap-4 mb-4 last:mb-0'}>
            <div className={`flex items-center justify-between w-full relative ${reply && 'pr-[2.4rem]'}`}>
                <div className='flex items-start gap-2'>
                    <Avatar className="w-8 h-8">
                        <Image src={commentItem?.uploader.image || '/image/user.png'} width={32} height={32} alt={''} />
                    </Avatar>
                    <div className="space-y-1">
                        <Link href={`/user/${commentItem.uploader.username}`} className="text-sm font-semibold">
                            {commentItem.uploader.first_name} {commentItem.uploader.last_name}
                        </Link>
                        <p className="text-xs">
                            {commentItem.comment}
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground gap-4">
                            <div>{commentItem.createdAt}</div>
                            {
                                !reply && <ReplyModal comment={commentItem} commentIndex={commentIndex} feed={feed}
                                    feedIndex={feedIndex} setComments={setComments} />
                            }
                            {
                                commentItem.self && <EditCommentModal comment={commentItem} commentIndex={commentIndex}
                                    replyIndex={replyIndex} reply={reply}
                                    setComments={setComments} />
                            }
                            {
                                commentItem.self && <div className='flex cursor-pointer'
                                    onClick={() => DeleteComment(accessToken, commentItem, commentIndex, reply, replyIndex, feedIndex, setFeed, setComments)}>
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
        </div>
    )
}


const CommentForm = ({ setComments, feed }: { feed: FeedType, setComments: React.Dispatch<React.SetStateAction<CommentType[]>> }) => {
    const [loading, setLoading] = React.useState(false)

    const authContext = React.useContext<AuthContextType | undefined>(AuthContext)
    const accessToken = authContext?.accessToken

    return (
        <Formik initialValues={{
            comment: ''
        }} onSubmit={async (values, actions) => {
            await CreateComment(accessToken, values.comment, feed.id, setLoading, setComments)
            actions.resetForm()
        }}>
            {({ values, handleChange, handleSubmit }) => (
                <Form className='flex flex-col gap-2 pt-4'>
                    <Textarea placeholder="Add a comment..." rows={3} value={values.comment} name={'comment'}
                        onChange={e => handleChange(e)}
                        className="w-full border rounded-md p-2 bg-transparent focus:outline-none" />
                    {
                        loading ? <Button disabled className="gap-2">
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </Button> : <Button type="submit" className="gap-2"
                            onClick={() => handleSubmit}>
                            <BiSend className='text-base' />
                            <span>Submit</span>
                        </Button>
                    }
                </Form>
            )}
        </Formik>
    )
}

interface ReplyModalProps {
    comment: CommentType | ReplyType,
    commentIndex: number,
    feed: FeedType,
    feedIndex: number,
    setComments: React.Dispatch<React.SetStateAction<CommentType[]>>
}

const ReplyModal = ({ comment, commentIndex, feed, feedIndex, setComments }: ReplyModalProps) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const authContext = React.useContext<AuthContextType | undefined>(AuthContext)
    const accessToken = authContext?.accessToken
    const feedContext = React.useContext<FeedContextType | undefined>(FeedContext)
    const setFeed = feedContext?.setFeed

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
                        }}
                            onSubmit={async (values) => await CreateReply(accessToken, values.comment, comment, setComments, setLoading, setIsOpen, commentIndex, feed, setFeed, feedIndex)}>
                            {({ values, handleChange, handleSubmit }) => (
                                <Form className='flex flex-col gap-2 pt-4'>
                                    <Textarea placeholder="Add a comment..." rows={3} name={'comment'}
                                        value={values.comment}
                                        onChange={e => handleChange(e)}
                                        className="w-full border rounded-md p-2 bg-transparent focus:outline-none" />
                                    {
                                        loading ? <Button disabled className="gap-2">
                                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                            Please wait
                                        </Button> :
                                            <Button className="gap-2"
                                                type={"submit"}
                                                onClick={() => handleSubmit}>
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

interface EditCommentModalProps {
    comment: CommentType | ReplyType,
    commentIndex: number,
    replyIndex: number | null,
    reply: boolean,
    setComments: React.Dispatch<React.SetStateAction<CommentType[]>>
}

const EditCommentModal = ({ comment, commentIndex, replyIndex, reply, setComments }: EditCommentModalProps) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState<boolean>(false)

    const authContext = React.useContext<AuthContextType | undefined>(AuthContext)
    const accessToken = authContext?.accessToken

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
                                        <Textarea placeholder="Add a comment..." rows={3} name={'comment'}
                                            value={values.comment}
                                            onChange={e => handleChange(e)}
                                            className="w-full border rounded-md p-2 bg-transparent focus:outline-none" />
                                        {
                                            loading ? <Button disabled className="gap-2">
                                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                                Please wait
                                            </Button> :
                                                <Button className="gap-2"
                                                    type={"submit"}
                                                    onClick={() => handleSubmit}>
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

const EditComment = async (
    accessToken: AccessToken | undefined,
    value: string,
    comment: CommentType | ReplyType,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    commentIndex: number,
    reply: boolean,
    replyIndex: number | null,
    setComments: React.Dispatch<React.SetStateAction<CommentType[]>>
) => {
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
                if (reply && replyIndex) {
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

const CreateReply = async (
    accessToken: AccessToken | undefined,
    value: string,
    comment: CommentType | ReplyType,
    setComments: React.Dispatch<React.SetStateAction<CommentType[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    commentIndex: number,
    feed: FeedType,
    setFeed: React.Dispatch<React.SetStateAction<FeedType[]>> | undefined,
    feedIndex: number
) => {
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
            setFeed && setFeed(pre => {
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

const CreateComment = async (
    accessToken: AccessToken | undefined,
    comment: string,
    postId: string,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setComments: React.Dispatch<React.SetStateAction<CommentType[]>>,
) => {
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
        })
}

const DeleteComment = async (
    accessToken: AccessToken | undefined,
    comment: CommentType | ReplyType,
    commentIndex: number,
    reply: boolean,
    replyIndex: number | null,
    feedIndex: number,
    setFeed: React.Dispatch<React.SetStateAction<FeedType[]>> | undefined,
    setComments: React.Dispatch<React.SetStateAction<CommentType[]>>
) => {
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
            setFeed && setFeed(pre => {
                let newData = [...pre];
                newData[feedIndex].commentNo = response.data.commentNo;
                return newData;
            })
        })
}

const FetchComments = async (
    accessToken: AccessToken | undefined,
    postId: string,
    setComments: React.Dispatch<React.SetStateAction<CommentType[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
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