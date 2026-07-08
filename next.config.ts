import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'images.unsplash.com',
      },
      {
        hostname: 'source.unsplash.com',
      },
      {
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        hostname: 'cdn.prodrivermags.com',
      },
    ],
  },
  allowedDevOrigins: ['10.40.136.113'],
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
