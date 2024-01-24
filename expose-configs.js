const fs = require('fs');
const os = require("os");
const path = require("path");

const envFilePath = path.resolve(__dirname, ".env");
const readEnvVars = () => fs.readFileSync(envFilePath, "utf-8").split(os.EOL);
const cliArgs = process.argv.slice(2);
const profile = cliArgs[0];
const configFile = cliArgs[1];
const json = JSON.parse(fs.readFileSync(configFile));

function extractDynamicConfigurations (remoteConfig) {
    if(remoteConfig) {
        let propertySources = remoteConfig.propertySources;
        if(propertySources && propertySources.length>0) {
            const appConfigSource = propertySources.find(propSource=>propSource.name &&
                (propSource.name.includes('confidant-health-mobile') || propSource.name.includes('confidant-health-provider')));
            if(appConfigSource) {
                return appConfigSource.source;
            }
        }
    }
    return null;
}

function setEnvValue (key, value) {
    const envVars = readEnvVars();
    const targetLine = envVars.find((line) => line.split("=")[0] === key);
    if (targetLine !== undefined) {
        // update existing line
        const targetLineIndex = envVars.indexOf(targetLine);
        // replace the key/value with the new value
        envVars.splice(targetLineIndex, 1, `${key}="${value}"`);
    } else {
        // create new key value
        envVars.push(`${key}="${value}"`);
    }
    // write everything back to the file system
    fs.writeFileSync(envFilePath, envVars.join(os.EOL));
}

let appConfig = json;
if(!appConfig.branch) {
    appConfig = extractDynamicConfigurations(json)
}
setEnvValue('REACT_APP_ENVIRONMENT',profile);
setEnvValue('BRANCH_KEY',appConfig.branch.key || appConfig['branch.key']);
setEnvValue('INSTABUG_TOKEN',appConfig.instabug.token || appConfig['instabug.token']);
setEnvValue('SENDBIRD_APP_ID',appConfig.sendbird.appId || appConfig['sendbird.appId']);
setEnvValue('OPENTOK_API_KEY',appConfig.opentok.apiKey || appConfig['opentok.apiKey']);
setEnvValue('S3_BUCKET',appConfig.s3.bucket.name || appConfig['s3.bucket.name']);
setEnvValue('S3_URL',appConfig.s3.bucket.url || appConfig['s3.bucket.url']);
setEnvValue('S3_REGION',appConfig.s3.client.region || appConfig['s3.client.region']);
setEnvValue('S3_ACCESS_KEY',appConfig.s3.client.accessKey || appConfig['s3.client.accessKey']);
setEnvValue('S3_SECRET_KEY',appConfig.s3.client.secretKey || appConfig['s3.client.secretKey']);
setEnvValue('STRIPE_PUBLISHABLE_KEY',appConfig.stripe.publishableKey || appConfig['stripe.publishableKey']);
setEnvValue('ONESIGNAL_APP_ID',appConfig.onesignal.provider.appId || appConfig['onesignal.provider.appId']);
setEnvValue('ONESIGNAL_API_KEY',appConfig.onesignal.provider.apiKey || appConfig['onesignal.provider.apiKey']);
setEnvValue('SEGMENT_WRITE_KEY',appConfig.segment.writeKey || appConfig['segment.writeKey']);
console.log('Environment variables set');
