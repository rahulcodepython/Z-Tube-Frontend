/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        BACKEND_DOMAIN_NAME: process.env.BACKEND_DOMAIN_NAME,
        ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
        GOOGLE_OAUTH_REDIRECT_URI: process.env.GOOGLE_OAUTH_REDIRECT_URI,
    },
    images: {
        remotePatterns: [
            {
                protocol: process.env.BACKEND_HOST_PROTOCOL,
                hostname: process.env.BACKEND_HOST_NAME,
                port: process.env.BACKEND_PORT,
                pathname: process.env.BACKEND_IMAGE_PATHNAME,
            },
        ],
    },
}

module.exports = nextConfig
