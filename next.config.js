/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // ❌ Remove "export" mode
  images: {
    unoptimized: true,
    domains: ['assets.aceternity.com', 'images.unsplash.com'],
  },
};

module.exports = nextConfig;
