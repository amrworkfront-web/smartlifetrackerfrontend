import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin(
  './i18n/request.ts'
);

const apiBackend = process.env.NEXT_PUBLIC_API_BASE_URL || "https://smartlifetrackerbackend-production.up.railway.app/api";

export default withNextIntl({
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${apiBackend}/:path*`,
      },
    ];
  },
});
