/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BACKEND_DOMAIN_NAME: process.env.BACKEND_DOMAIN_NAME,
        ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    }
}

module.exports = nextConfig
