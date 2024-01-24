export const S3_CLIENT_OPTIONS = {
    region: process.env.S3_REGION,
    accessKey: process.env.S3_ACCESS_KEY,
    secretKey: process.env.S3_SECRET_KEY,
    successActionStatus: 201, // applicationConfig['s3.client.successActionStatus'],
    bucket: process.env.S3_BUCKET,
  };
  