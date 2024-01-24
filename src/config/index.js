import {
    REACT_APP_ENVIRONMENT,
    BRANCH_KEY,
    INSTABUG_TOKEN,
    SENDBIRD_APP_ID,
    OPENTOK_API_KEY,
    S3_BUCKET,
    S3_URL,
    S3_REGION,
    S3_ACCESS_KEY,
    S3_SECRET_KEY,
    STRIPE_PUBLISHABLE_KEY,
    ONESIGNAL_APP_ID,
    ONESIGNAL_API_KEY,
    SEGMENT_WRITE_KEY,
} from '@env';
let baseUrl;
let wsUrl;
console.log(`Using Environment ${REACT_APP_ENVIRONMENT}`);

export default {
    environment: REACT_APP_ENVIRONMENT,
    baseUrl,
    wsUrl,
    branchKey: BRANCH_KEY,
    instabugToken: INSTABUG_TOKEN,
    sendbirdAppId: SENDBIRD_APP_ID,
    opentokApiKey: OPENTOK_API_KEY,
    s3: {
        bucket: {
            name: S3_BUCKET,
            url: S3_URL?.replaceAll('http', 'https'),
        },
        client: {
            region: S3_REGION,
            accessKey: S3_ACCESS_KEY,
            secretKey: S3_SECRET_KEY,
            successActionStatus: 201,
        },
    },
    stripePublishableKey: STRIPE_PUBLISHABLE_KEY,
    oneSignal: {
        appId: ONESIGNAL_APP_ID,
        apiKey: ONESIGNAL_API_KEY,
    },
    segmentWriteKey: SEGMENT_WRITE_KEY,
};

