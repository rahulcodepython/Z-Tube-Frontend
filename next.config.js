/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BACKEND_DOMAIN_NAME: process.env.BACKEND_DOMAIN_NAME,
    }
}

module.exports = nextConfig
