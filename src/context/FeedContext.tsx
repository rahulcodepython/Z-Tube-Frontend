import React from "react";

export interface FeedType {
    id: string
    caption: string
    tags: Array<string>
    media: Array<string>
    uploader: {
        first_name: string
        last_name: string
        username: string
        image: string
        is_superuser: boolean
    }
    createdAt: string
    isPublic: boolean
    isProtected: boolean
    isPersonal: boolean
    isHidden: boolean
    isPrivate: boolean
    likeNo: number
    viewsNo: number
    share: number
    allowComments: boolean
    commentNo: number
    self: boolean;
    user_reaction: string | null;
}

export interface FeedContextType {
    feed: Array<FeedType> | [];
    setFeed: React.Dispatch<React.SetStateAction<Array<FeedType>>>;
}

export const FeedContext = React.createContext<FeedContextType | undefined>(undefined);

interface FeedProviderProps {
    children: React.ReactNode;
}

export const FeedProvider: React.FC<FeedProviderProps> = ({ children }) => {
    const [feed, setFeed] = React.useState<Array<FeedType>>([]);

    return (
        <FeedContext.Provider value={{ feed, setFeed }}>
            {children}
        </FeedContext.Provider>
    );
};
