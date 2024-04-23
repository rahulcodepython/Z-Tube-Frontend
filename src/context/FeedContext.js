"use client";
import React from "react";

export const FeedContext = React.createContext(undefined);

export const FeedProvider = ({ children }) => {
    const [feed, setFeed] = React.useState([]);

    return (
        <FeedContext.Provider value={{ feed, setFeed }}>
            {children}
        </FeedContext.Provider>
    );
}
