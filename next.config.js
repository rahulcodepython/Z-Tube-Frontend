/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        BACKEND_DOMAIN_NAME: process.env.BACKEND_DOMAIN_NAME,
        ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
        GOOGLE_OAUTH_REDIRECT_URI: process.env.GOOGLE_OAUTH_REDIRECT_URI,
    }
}

module.exports = nextConfig
