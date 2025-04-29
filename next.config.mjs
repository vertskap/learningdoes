/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: {
        "unoptimized": true
    },
    reactStrictMode: true,
    experimental: {
        reactRefresh: true
    }
};

export default nextConfig;
