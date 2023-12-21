declare module NodeJS {
    interface ProcessEnv {
        MONGODB_URI: string;
        AUTH_SECRET: string;
        EMAIL_PASSWORD: string;
        EMAIL_ADDRESS: string;
        EMAIL_VERIFICATION_SECRET: string;
        SITE_URL: string;
    }
}
