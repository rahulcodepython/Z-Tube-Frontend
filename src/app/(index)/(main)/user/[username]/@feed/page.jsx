"use client"
import React from 'react'
import PostCard from "@/app/(index)/(main)/user/[username]/@feed/components/client/PostCard";
import { AuthContext } from '@/context/AuthContext'
import Loading from "@/app/(index)/(main)/user/[username]/@feed/components/server/loading";
import axios from "axios";
import { DataContext } from '@/context/DataContext';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const Feed = ({ params }) => {
    const { accessToken } = React.useContext(AuthContext)

    const { data, setData } = React.useContext(DataContext)

    const [loading, setLoading] = React.useState('feedPost' in data ? decodeURIComponent(params.username) in data.feedPost ? false : true : true)

    React.useEffect(() => {
        const handler = async () => {
            await FetchFeedPost(accessToken, params.username, setData, setLoading);
        }
        handler();
    }, [])

    return loading ? <Loading /> : <div className='w-full flex flex-col gap-8'>
        <div className='grid grid-cols-3 gap-4 mt-8'>
            {
                data.feedPost[decodeURIComponent(params.username)].length === 0 ? <div>No Post There</div> : data.feedPost[decodeURIComponent(params.username)].map((item, index) => {
                    return <PostCard key={index} feed={item} feedIndex={index} username={params.username} />
                })
            }
        </div>
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" disabled />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#" isActive>
                        2
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href="#" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    </div>
}

const FetchFeedPost = async (accessToken, username, setData, setLoading) => {
    const options = {
        headers: {
            Authorization: `JWT ${accessToken}`
        }, url: `${process.env.BASE_API_URL}/feed/posts/${username}/`, method: 'GET',
    };

    await axios.request(options).then(response => {
        setData(pre => {
            let newData = { ...pre };

            const resultFeedPost = 'feedPost' in newData ? decodeURIComponent(username) in newData.feedPost ? [...newData.feedPost[decodeURIComponent(username)], ...response.data.results] : response.data.results : response.data.results

            newData.feedPost = {
                [decodeURIComponent(username)]: []
                // [decodeURIComponent(username)]: response.status === 200 ? resultFeedPost : []
            }
            return newData;
        })
    }).finally(() => setLoading(false))
}

export default Feed