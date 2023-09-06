/** @type {import('next').NextConfig} */



const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/privacy",
                destination: "/privacy.html"

            },
            {
                source: "/cookies",
                destination: "/cookies.html"

            },
            {
                source: "/terms",
                destination: "/termsandconditions.html"

            },
        ]
    }





}

module.exports = nextConfig
