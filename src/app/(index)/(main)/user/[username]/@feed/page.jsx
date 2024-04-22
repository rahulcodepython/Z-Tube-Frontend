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
    const [pagination, setPagination] = React.useState({
        count: 0,
        next: null,
        previous: null,
    })
    const [page, setPage] = React.useState(1)

    const pageNumbers = Array.from({ length: calculatePages(pagination.count, 3) }, (_, index) => index + 1);

    React.useEffect(() => {
        const handler = async () => {
            await FetchFeedPost(accessToken, params.username, setData, setLoading, setPagination, page);
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
                    {pagination.previous && <PaginationPrevious href="#" onClick={() => setPage(page - 1)} />}
                </PaginationItem>
                {
                    pageNumbers.map((item, index) => {
                        return <PaginationItem key={index}>
                            <PaginationLink href="#" isActive={item === page ? true : false} onClick={() => setPage(item)}>
                                {item}
                            </PaginationLink>
                        </PaginationItem>
                    })
                }
                <PaginationItem>
                    {pagination.next && <PaginationNext href="#" onClick={() => setPage(page + 1)} />}
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    </div>
}

const FetchFeedPost = async (accessToken, username, setData, setLoading, setPagination, page) => {
    const options = {
        headers: {
            Authorization: `JWT ${accessToken}`
        }, url: `${process.env.BASE_API_URL}/feed/posts/${username}/${page <= 1 ? '' : `?page=${page}`}`, method: 'GET',
    };

    await axios.request(options).then(response => {
        setData(pre => {
            let newData = { ...pre };

            const resultFeedPost = 'feedPost' in newData ? decodeURIComponent(username) in newData.feedPost ? [...newData.feedPost[decodeURIComponent(username)], ...response.data.results] : response.data.results : response.data.results

            newData.feedPost = {
                [decodeURIComponent(username)]: response.status === 200 ? resultFeedPost : []
            }
            return newData;
        })
        setPagination({
            count: response.data.count,
            next: response.data.next,
            previous: response.data.previous,
        })
    }).finally(() => setLoading(false))
}

const calculatePages = (totalItems, itemsPerPage) => {
    // Calculate the number of full pages needed
    const fullPages = Math.floor(totalItems / itemsPerPage);

    // If there are any remaining items that don't make a full page
    const remainder = totalItems % itemsPerPage;

    // If remainder is greater than 0, we need an additional page for them
    const additionalPage = remainder > 0 ? 1 : 0;

    // Total pages required
    const totalPages = fullPages + additionalPage;

    return totalPages;
}

export default Feed