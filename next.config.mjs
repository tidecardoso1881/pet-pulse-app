/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/register',
        destination: '/cadastro',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
