/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cdn.shopify.com',
            pathname: '/s/files/**'
          },
           {
        protocol: 'https',
        hostname: `images.pexels.com`
      },
      {
        protocol: 'https',
        hostname: `img.youtube.com`
      },
        ]
      }
};

export default nextConfig;
