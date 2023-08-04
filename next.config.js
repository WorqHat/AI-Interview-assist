/** @type {import('next').NextConfig} */
/* The code is defining a Next.js configuration object called `nextConfig`. This object has a property
`reactStrictMode` set to `true`, which enables strict mode for React. */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
