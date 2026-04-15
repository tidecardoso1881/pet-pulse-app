/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Redirect URL do Vercel para o domínio de produção
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "pet-pulse-app-tide-cardosos-projects.vercel.app",
          },
        ],
        destination: "https://pets-pulse.com.br/:path*",
        permanent: true,
      },
      // Redirect /register → /cadastro (inglês → português)
      {
        source: "/register",
        destination: "/cadastro",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;