/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    reactStrictMode: false,
    env: {
        BACKEND_DOMAIN_NAME: process.env.BACKEND_DOMAIN_NAME,
        ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
        GOOGLE_OAUTH_REDIRECT_URI: process.env.GOOGLE_OAUTH_REDIRECT_URI,
        APIKEY: process.env.APIKEY,
        AUTHDOMAIN: process.env.AUTHDOMAIN,
        PROJECTID: process.env.PROJECTID,
        STORAGEBUCKET: process.env.STORAGEBUCKET,
        MESSAGINGSENDERID: process.env.MESSAGINGSENDERID,
        APPID: process.env.APPID,
        MEASUREMENTID: process.env.MEASUREMENTID,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "firebasestorage.googleapis.com",
                port: '',
                pathname: '/v0/b/z-tube-53cf1.appspot.com/**',
            },
        ],
    },
}

module.exports = nextConfig
