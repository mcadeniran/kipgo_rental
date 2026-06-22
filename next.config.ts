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
  allowedDevOrigins: ['10.170.43.113'],
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
