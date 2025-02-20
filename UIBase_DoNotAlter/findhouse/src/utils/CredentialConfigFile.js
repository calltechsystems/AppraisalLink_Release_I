export const getCredsConfigData = () => {
    if(process.env.NODE_ENV == "development"){
        //when its on development Mode
        return {
            NODE_ENV: process.env.NODE_ENV,
            DOMAIN: process.env.STAGING_DOMAIN,
            //CRYPTO CREDS
            CRYPTO_SECRET_KEY: process.env.CRYPTO_SECRET_KEY,
            COOKIE_PASSWORD: process.env.COOKIE_PASSWORD,
            //AWS CREDS
            AWS_API_KEY: process.env.AWS_API_KEY_STAGING,
            AWS_API_SECRET: process.env.AWS_API_SECRET_STAGING,
            AWS_BUCKET: process.env.AWS_BUCKET_STAGING,
            AWS_REGION: process.env.AWS_REGION_STAGING,
            //paypal CREDS
            PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID_STAGING,
            PAYPAL_CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET_STAGING,
            PAYPAL_WEBHOOK_ID: process.env.PAYPAL_WEBHOOK_ID_STAGING,
            NEXT_PUBLIC_PAYPAL_CLIENT_ID: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID_STAGING,
            NEXT_PUBLIC_PAYPAL_CLIENT_SECRET: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_SECRET_STAGING,
        }
    }
    else{
        //when its on Production Mode
        return {
            NODE_ENV: process.env.NODE_ENV,
            DOMAIN: process.env.PRODUCTION_DOMAIN,
            //CRYPTO CREDS
            CRYPTO_SECRET_KEY: process.env.CRYPTO_SECRET_KEY,
            COOKIE_PASSWORD: process.env.COOKIE_PASSWORD,
            //AWS CREDS
            AWS_API_KEY: process.env.AWS_API_KEY_PRODUCTION,
            AWS_API_SECRET: process.env.AWS_API_SECRET_PRODUCTION,
            AWS_BUCKET: process.env.AWS_BUCKET_PRODUCTION,
            AWS_REGION: process.env.AWS_REGION_PRODUCTION,
            //paypal CREDS
            PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID_PRODUCTION,
            PAYPAL_CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET_PRODUCTION,
            PAYPAL_WEBHOOK_ID: process.env.PAYPAL_WEBHOOK_ID_PRODUCTION,
            NEXT_PUBLIC_PAYPAL_CLIENT_ID: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID_PRODUCTION,
            NEXT_PUBLIC_PAYPAL_CLIENT_SECRET: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_SECRET_PRODUCTION,
        }
    }
}