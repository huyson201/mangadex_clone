const { hostname } = require('os');

/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')();
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "mangadex.org"
            },
            {
                hostname: "uploads.mangadex.org"
            }
        ]
    },




}



module.exports = withNextIntl(nextConfig);
