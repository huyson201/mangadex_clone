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
            { hostname: "t0.gstatic.com" }
        ]
    },
    async rewrites() {
        return [
            // Exclude /api/auth

            // Rewrite for all paths excluding /api/auth
            {
                source: '/api/:path((?!_next|foo$|bar$|auth).*)',
                destination: 'https://api.mangadex.org/:path*', // Use the same destination as source
            },

        ]
    }

}



module.exports = withNextIntl(nextConfig);
