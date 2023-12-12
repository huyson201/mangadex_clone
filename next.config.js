/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')();
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "mangadex.org"
            }
        ]
    }
}



module.exports = withNextIntl(nextConfig);
