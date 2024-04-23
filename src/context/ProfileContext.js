"use client";
import React from "react";

export const ProfileContext = React.createContext(undefined);

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = React.useState(null);

    const addFriend = () => {
        setProfile((pre) => ({
            ...pre,
            isFriend: true
        }));
    };

    const removeFriend = () => {
        setProfile((pre) => ({
            ...pre,
            isFriend: false
        }));
    };

    return (
        <ProfileContext.Provider value={{ profile, setProfile, addFriend, removeFriend }}>
            {children}
        </ProfileContext.Provider>
    );
}
