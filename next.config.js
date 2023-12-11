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
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "firebasestorage.googleapis.com",
                port: '',
                pathname: '/v0/b/z-tube-b4601.appspot.com/**',
            },
        ],
    },
}

module.exports = nextConfig
