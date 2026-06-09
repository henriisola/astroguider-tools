/** @type {import('next').NextConfig} */
const baseConfig = {
  output: 'export',
  trailingSlash: true,
  experimental: {
    serverActions: true,
  },
};

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts',
        expiration: { maxEntries: 4, maxAgeSeconds: 365 * 24 * 60 * 60 },
      },
    },
    {
      urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'jsdelivr-cdn',
        expiration: { maxEntries: 10, maxAgeSeconds: 365 * 24 * 60 * 60 },
      },
    },
    {
      urlPattern: /^\/.*$/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'app-pages',
        expiration: { maxEntries: 50, maxAgeSeconds: 30 * 24 * 60 * 60 },
      },
    },
  ],
});

module.exports = withPWA(baseConfig);
