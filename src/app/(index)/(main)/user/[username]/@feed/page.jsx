"use client"
import React from 'react'
import PostCard from "@/app/(index)/(main)/user/[username]/@feed/components/client/PostCard";
import { AuthContext } from '@/context/AuthContext'
import Loading from "@/app/(index)/(main)/user/[username]/@feed/components/server/loading";
import axios from "axios";
import { DataContext } from '@/context/DataContext';
import InfiniteScroll from 'react-infinite-scroll-component';

const Feed = ({ params }) => {
    const { accessToken } = React.useContext(AuthContext)

    const { data, setData } = React.useContext(DataContext)

    const [loading, setLoading] = React.useState('feedPost' in data ? decodeURIComponent(params.username) in data.feedPost ? false : true : true)
    const [pagination, setPagination] = React.useState({
        count: 0,
        nextUrl: null,
        previousUrl: null,
    })

    React.useEffect(() => {
        const handler = async () => {
            await FetchFeedPost(accessToken, params.username, setData, setLoading, setPagination);
        }
        handler();
    }, [])

    return loading ? <Loading /> : data.feedPost[decodeURIComponent(params.username)].length === 0 ? <div>No Post There</div> : <InfiniteScroll dataLength={pagination.count} next={FetchNextFeedPost(accessToken, pagination.nextUrl, params.username, setData, setPagination)} hasMore={pagination.nextUrl !== null} loader={<h4>Loading...</h4>}>
        <div className='grid grid-cols-3 gap-4 mt-8'>
            {
                data.feedPost[decodeURIComponent(params.username)].map((item, index) => {
                    return <PostCard key={index} feed={item} feedIndex={index} username={params.username} />
                })
            }
        </div>
    </InfiniteScroll>
}

const FetchFeedPost = async (accessToken, username, setData, setLoading, setPagination) => {
    const options = {
        headers: {
            Authorization: `JWT ${accessToken}`
        }, url: `${process.env.BASE_API_URL}/feed/posts/${username}/`, method: 'GET',
    };

    await axios.request(options).then(response => {
        setData(pre => {
            let newData = { ...pre };

            const resultFeedPost = response.status === 200 ? 'feedPost' in newData ? decodeURIComponent(username) in newData.feedPost ? [...newData.feedPost[decodeURIComponent(username)], ...response.data.results] : response.data.results : response.data.results : []

            newData.feedPost = {
                [decodeURIComponent(username)]: resultFeedPost
            }
            return newData;
        })
        setPagination({
            count: response.data.count || null,
            nextUrl: response.data.next || null,
            previousUrl: response.data.previous || null,
        })
    }).finally(() => setLoading(false))
}

const FetchNextFeedPost = async (accessToken, url, username, setData, setPagination) => {
    if (!url) return;
    const options = {
        headers: {
            Authorization: `JWT ${accessToken}`
        }, url: url, method: 'GET',
    };

    await axios.request(options).then(response => {
        setData(pre => {
            let newData = { ...pre };

            newData.feedPost[decodeURIComponent(username)] = [...newData.feedPost[decodeURIComponent(username)], ...response.data.results]

            return newData;
        })
        setPagination({
            count: response.data.count || null,
            nextUrl: response.data.next || null,
            previousUrl: response.data.previous || null,
        })
    })
}

export default Feed