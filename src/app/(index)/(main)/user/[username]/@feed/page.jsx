"use client"
import React from 'react'
import PostCard from "@/app/(index)/(main)/user/[username]/@feed/components/client/PostCard";
import { AuthContext } from '@/context/AuthContext'
import Loading from "@/app/(index)/(main)/user/[username]/@feed/components/server/loading";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component';
import { FeedContext } from '@/context/FeedContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CreateFeed from './components/client/CreateFeed';

const Feed = ({ params }) => {
    const { accessToken } = React.useContext(AuthContext)

    const { feed, setFeed } = React.useContext(FeedContext)

    const [loading, setLoading] = React.useState(true)
    const [pagination, setPagination] = React.useState({
        count: 0,
        nextUrl: null,
        previousUrl: null,
        hasMore: false
    })

    React.useEffect(() => {
        const handler = async () => {
            await FetchFeedPost(accessToken, params.username, setFeed, setLoading, setPagination);
        }
        handler();
    }, [])

    return loading ? <Loading /> : feed.length === 0 ? <div>No Post There</div> :
        <Tabs defaultValue="feeds" className="w-full grid grid-cols-6 gap-4 mt-4">
            <TabsList className="grid grid-cols-1 h-fit">
                <TabsTrigger value="feeds">Posts</TabsTrigger>
                <TabsTrigger value="createFeed">Create Feed</TabsTrigger>
            </TabsList>
            <div className='col-span-5'>
                <TabsContent value="feeds" className="mt-0">
                    <InfiniteScroll dataLength={pagination.count} next={FetchNextFeedPost(accessToken, pagination.nextUrl, setFeed, setPagination)} hasMore={pagination.hasMore} loader={<h4>Loading...</h4>}>
                        <div className='grid grid-cols-3 gap-4'>
                            {
                                feed.map((item, index) => {
                                    return <PostCard key={index} feed={item} feedIndex={index} />
                                })
                            }
                        </div>
                    </InfiniteScroll>
                </TabsContent>
                <TabsContent value="createFeed">
                    <CreateFeed />
                </TabsContent>
            </div>
        </Tabs>
}

const FetchFeedPost = async (accessToken, username, setFeed, setLoading, setPagination) => {
    const options = {
        headers: {
            Authorization: `JWT ${accessToken}`
        }, url: `${process.env.BASE_API_URL}/feed/posts/${username}/`, method: 'GET',
    };

    await axios.request(options).then(response => {
        setFeed(response.data.results)
        setPagination({
            count: response.data.count ?? null,
            nextUrl: response.data.next ?? null,
            previousUrl: response.data.previous ?? null,
            hasMore: response.data.next ? true : false
        })
    }).finally(() => setLoading(false))
}

const FetchNextFeedPost = async (accessToken, url, setFeed, setPagination) => {
    if (!url) return;
    console.log("Next");
    const options = {
        headers: {
            Authorization: `JWT ${accessToken}`
        }, url: url, method: 'GET',
    };

    await axios.request(options).then(response => {
        setFeed(pre => {
            return [
                ...pre,
                ...response.data.results
            ]
        })
        setPagination({
            count: response.data.count ?? null,
            nextUrl: response.data.next ?? null,
            previousUrl: response.data.previous ?? null,
            hasMore: response.data.next ? true : false
        })
    })
}

export default Feed