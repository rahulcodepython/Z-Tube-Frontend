"use client"
import React from 'react'
import {ScrollArea} from '@/components/ui/scroll-area'
import {AuthContext} from "@/context/AuthContext";
import axios from "axios";
import {Avatar} from '@/components/ui/avatar';
import Image from 'next/image';
import Link from 'next/link';
import {BiSend, IoChatbubbleOutline, FiEdit} from '@/data/icons/icons'
import {Textarea} from '@/components/ui/textarea'
import {Button} from '@/components/ui/button'
import {ReloadIcon} from '@radix-ui/react-icons'
import {DateTimeParser} from '@/utils'
import {Form, Formik} from "formik";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const Comment = ({post, setPost}) => {
    const {accessToken} = React.useContext(AuthContext)

    const [comments, setComments] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        const handler = async () => {
            await FetchComments(accessToken, post.id, setComments)
            setLoading(pre => false)
        }
        handler();
    }, [])

    return loading ? "Loading..." : <DialogDescription>
            <ScrollArea className="h-[300px] pt-4 pb-2 pr-4">
                {
                    comments.map((item, index) => {
                        return <CommentItem key={index} post={post} setPost={setPost} commentItem={item} setComments={setComments} reply={true} />
                    })
                }
            </ScrollArea>
            <CommentForm post={post} setComments={setComments} setPost={setPost}/>
        </DialogDescription>
}

const CommentItem = ({commentItem, setComments, post, setPost, reply}) => {
    const [comment, setComment] = React.useState(commentItem)

    return (
        <div className={'flex flex-col items-center justify-between gap-4 mb-4 last:mb-0'}>
            <div className={`flex items-center justify-between w-full relative ${!reply && 'pr-[2.4rem]'}`}>
                <div className='flex items-start gap-2'>
                    <Avatar className="w-8 h-8">
                        <Image src={comment.uploader.image || '/image/user.png'} width={32} height={32} alt={''}/>
                    </Avatar>
                    <div className="space-y-1">
                        <Link href={`/user/${comment.uploader.username}`}
                              className="text-sm font-semibold">{comment.uploader.name}</Link>
                        <p className="text-xs">
                            {comment.comment}
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground gap-4">
                            <div>{comment.createdAt}</div>
                            {reply && <ReplyModal post={post} comment={comment} setPost={setPost}/>}
                            <EditCommentModal comment={comment} setComment={setComment}/>
                        </div>
                    </div>
                </div>
            </div>
            {
                comment.children ? <div className={'ml-20 w-full'}>
                    {
                        comment.children.map((item, index) => {
                            return <CommentItem post={post} setPost={setPost} commentItem={item}
                                                setComments={setComments} key={index} reply={false} />
                        })
                    }
                </div> : null
            }
        </div>
    )
}

const CommentForm = ({post, setComments, setPost}) => {
    const [loading, setLoading] = React.useState(false)

    const {accessToken} = React.useContext(AuthContext)

    return (
        <Formik initialValues={{
            comment: ''
        }} onSubmit={async values => {
            await CreateComment(accessToken, values.comment, post, setComments, setLoading, setPost)
            values.comment = ''
        }}>
            {({values, handleChange, handleSubmit}) => (
                <Form className='flex flex-col gap-2 pt-4'>
                    <Textarea placeholder="Add a comment..." rows="3" value={values.comment} name={'comment'}
                              onChange={e => handleChange(e)}
                              class="w-full border rounded-md p-2 bg-transparent focus:outline-none focus:ring-0 focus-visible:ring-0"/>
                    {
                        loading ? <Button disabled>
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>
                            Please wait
                        </Button> : <Button
                            onClick={handleSubmit}>
                            <BiSend className='text-base'/>
                            <span>Submit</span>
                        </Button>
                    }
                </Form>
            )}
        </Formik>
    )
}

const ReplyModal = ({post, setPost, comment}) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const {accessToken} = React.useContext(AuthContext)
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>
                <div className='flex justify-center items-center gap-1'>
                    <IoChatbubbleOutline className='text-sm'/>
                    <span className='text-xs'>Reply</span>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Reply</DialogTitle>
                    <DialogDescription>
                        <Formik initialValues={{
                            comment: ''
                        }} onSubmit={async (values) => await CreateReply(accessToken, values.comment, post, comment, setLoading, setPost, setIsOpen)}>
                            {({values, handleChange, handleSubmit}) => (
                                <Form className='flex flex-col gap-2 pt-4'>
                                    <Textarea placeholder="Add a comment..." rows="3" name={'comment'}
                                              value={values.comment}
                                              onChange={e => handleChange(e)}
                                              class="w-full border rounded-md p-2 bg-transparent focus:outline-none focus:ring-0 focus-visible:ring-0"/>
                                    {
                                        loading ? <Button disabled>
                                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>
                                                Please wait
                                            </Button> :
                                            <Button
                                                type={"submit"}
                                                onClick={handleSubmit}>
                                                <BiSend className='text-base'/>
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

const EditCommentModal = ({comment, setComment}) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const {accessToken} = React.useContext(AuthContext)

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>
                <div className='flex justify-center items-center gap-1'>
                    <FiEdit className='text-sm'/>
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
                                onSubmit={async values => await EditComment(accessToken, values.comment, comment, setComment, setLoading, setIsOpen)}>
                            {
                                ({values, handleChange, handleSubmit}) => (
                                    <Form className='flex flex-col gap-2 pt-4'>
                                        <Textarea placeholder="Add a comment..." rows="3" name={'comment'}
                                                  value={values.comment}
                                                  onChange={e => handleChange(e)}
                                                  class="w-full border rounded-md p-2 bg-transparent focus:outline-none focus:ring-0 focus-visible:ring-0"/>
                                        {
                                            loading ? <Button disabled>
                                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>
                                                    Please wait
                                                </Button> :
                                                <Button
                                                    type={"submit"}
                                                    onClick={handleSubmit}>
                                                    <BiSend className='text-base'/>
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

const EditComment = async (accessToken, value, comment, setComment, setLoading, setIsOpen) => {
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
            setComment(() => response.data)
        })
        .finally(() => {
            setLoading(() => false)
            setIsOpen(() => false)
        })
}

const CreateReply = async (accessToken, value, post, comment, setLoading, setPost, setIsOpen) => {
    setLoading(() => true)
    const options = {
        method: 'POST',
        url: `${process.env.BASE_API_URL}/feed/createcomment/${post.id}/`,
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
            comment.children.push(response.data.comment)
            setPost({...post, commentNo: response.data.commentNo})
        })
        .finally(() => {
            setLoading(() => false)
            setIsOpen(() => false)
        })
}

const CreateComment = async (accessToken, comment, post, setComments, setLoading, setPost) => {
    setLoading(pre => true)
    const options = {
        method: 'POST',
        url: `${process.env.BASE_API_URL}/feed/createcomment/${post.id}/`,
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
            setComments(pre => [...pre, response.data.comment]);
            setPost({...post, commentNo: response.data.commentNo})
        })
        .catch(error => {
        });
    setLoading(pre => false)
}

const FetchComments = async (accessToken, postId, setComments) => {
    const options = {
        method: 'GET',
        url: `${process.env.BASE_API_URL}/feed/viewcomment/${postId}/`,
        headers: {
            Authorization: `JWT ${accessToken}`
        }
    };

    await axios.request(options)
        .then(response => {
            setComments(pre => response.data);
        })
        .catch(error => {
        });
}

export default Comment