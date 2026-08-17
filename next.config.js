/** @type {import('next').NextConfig} */
const isDevelopment = process.env.NODE_ENV === 'development';

const nextConfig = {
  reactStrictMode: true,
  ...(isDevelopment ? {} : { output: 'export' }),
  trailingSlash: true,
  images: { unoptimized: true },
  ...(isDevelopment
    ? {
        async rewrites() {
          return [
            {
              source: '/api/cartas-dev',
              destination: 'https://plusconsorcio.com.br/api/cartas.php',
            },
          ];
        },
      }
    : {}),
};

module.exports = nextConfig;
