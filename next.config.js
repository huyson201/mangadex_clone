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
            },
            {
                hostname: "t0.gstatic.com"
            },
            {
                hostname: new URL(process.env.SITE_URL || process.env.VERCEL_URL).hostname
            }
        ]
    },
    async rewrites() {
        return [

            // Rewrite for all paths excluding /api/auth
            {
                source: '/api/:path((?!_next|auth|uploads).*)',
                destination: 'https://api.mangadex.org/:path*', // Use the same destination as source
            },
            {
                source: '/api/uploads/:path*',
                destination: 'https://uploads.mangadex.org/covers/:path*'
            }

        ]
    },
    env: {
        SITE_URL: process.env.SITE_URL,
        VERCEL_URL: process.env.VERCEL_URL
    }

}



module.exports = withNextIntl(nextConfig);
