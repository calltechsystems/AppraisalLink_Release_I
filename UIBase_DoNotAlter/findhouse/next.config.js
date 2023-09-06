/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  appDir: true,
  env: {
    CRYPTO_SECRET_KEY: "gjfdkhslbreif847593rewfdkjbcm34woebkdjcnx43oihefdkcnx",
    COOKIE_PASSWORD: "ierfkgj439802vfckdh5438909endck",
  },
};

module.exports = nextConfig;
