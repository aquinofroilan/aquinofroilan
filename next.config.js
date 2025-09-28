/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.scdn.co",
                port: "",
                pathname: "/image/**",
            },
            {
                protocol: "https",
                hostname: "roadmap.sh",
                port: "",
            },
            {
                protocol: "https",
                hostname:
                    "b700c33a8dd77e29da09cb700c5c6959.r2.cloudflarestorage.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

module.exports = nextConfig;
