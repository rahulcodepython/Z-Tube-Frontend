/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        BASE_API_URL: process.env.BASE_API_URL,
        BASE_APP_URL: process.env.BASE_APP_URL,
        ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
        APIKEY: process.env.APIKEY,
        AUTHDOMAIN: process.env.AUTHDOMAIN,
        PROJECTID: process.env.PROJECTID,
        STORAGEBUCKET: process.env.STORAGEBUCKET,
        MESSAGINGSENDERID: process.env.MESSAGINGSENDERID,
        APPID: process.env.APPID,
        MEASUREMENTID: process.env.MEASUREMENTID,
        GOOGLE_OAUTH2_CLIENT_ID: process.env.GOOGLE_OAUTH2_CLIENT_ID,
        GOOGLE_OAUTH2_CLIENT_SECRET: process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "firebasestorage.googleapis.com",
                port: '',
                pathname: '/v0/b/z-tube-53cf1.appspot.com/**',
            },
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
                port: '',
                pathname: '/u/**',
            },
        ],
    },
};

export default nextConfig;
