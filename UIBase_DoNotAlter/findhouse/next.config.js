/** @type {import('next').NextConfig} */

// import {i18n} from './next1i.config'
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  appDir: true,
  eslint: { ignoreDuringBuilds: true },
  env: {
    DOMAIN2: 'http://appraisalland-prod.us-east-1.elasticbeanstalk.com/api',
    DOMAIN1: 'http://appraisalland-prod.us-east-1.elasticbeanstalk.com/api',
    BACKEND_DOMAIN: 'http://appraisalland-prod.us-east-1.elasticbeanstalk.com/api',
    BACKEND_DOMAIN2: 'http://appraisalland-prod.us-east-1.elasticbeanstalk.com/api',
    STAGING_DOMAIN:
      "http://appraisalland-prod.us-east-1.elasticbeanstalk.com/api",
    PRODUCTION_DOMAIN:
      "http://appraisalland-prod.us-east-1.elasticbeanstalk.com/api",
  },
  images: {
    domains: [
      // "res.cloudinary.com",
      "appraisalfile.s3.us-east-1.amazonaws.com",
      "appraisallandfiless.s3.amazonaws.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "https://www.paypalobjects.com/webstatic/mktg/logo/",
      "www.paypalobjects.com",
    ],
  },
};

module.exports = nextConfig;
