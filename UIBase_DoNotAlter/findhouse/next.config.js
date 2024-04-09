/** @type {import('next').NextConfig} */

// import {i18n} from './next1i.config'
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  appDir: true,
  env: {
    CRYPTO_SECRET_KEY: "gjfdkhslbreif847593rewfdkjbcm34woebkdjcnx43oihefdkcnx",
    COOKIE_PASSWORD: "ierfkgj439802vfckdh5438909endck",
    CLOUDINARY_CLOUD_NAME: "dcrq3m6dx",
    CLOUDINARY_API_KEY: "121866971488326",
    CLOUDINARY_API_SECRET: "FFNmV8H7NH3euKmH0wf1bFqfZjI",
    BACKEND_DOMAIN: "http://calltech-prod.us-east-1.elasticbeanstalk.com/api",
    BACKEND_DOMAIN2:
      "http://appraisalland-prod.us-east-1.elasticbeanstalk.com/api",
  },
  images: {
    domains: [
      // "res.cloudinary.com",
      "appraisallandfiless.s3.amazonaws.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
