#!/usr/bin/env bash
if [[ -z "$1" ]]; then
  echo "No Environment specified"
  exit 1
fi
if [[ $1 = "qa" ]]; then
  echo "QA Environment selected"
elif [[ $1 = "dev" ]]; then
  echo "Dev Environment selected"
elif [[ $1 = "sit1" ]]; then
  echo "SIT1 Environment selected"
elif [[ $1 = "prod" ]]; then
  echo "Prod Environment selected"
else
  echo "Configurations not supported for environment "$1
  exit 1
fi
URL="https://w1p4fyu0kl.execute-api.us-east-1.amazonaws.com/default/config-server-proxy-test?serviceName=confidant-health-mobile&env="$1
echo "Cleaning existing keys & configurations"
rm -rf configurations.json
rm -rf .env

echo "Requesting Configurations for environment "$1
if curl $URL --fail -H "x-api-key:${URL_API_KEY}" -o configurations.json; then
  echo $1" Environment Configurations fetched"
  touch .env
  node expose-configs.js $1 configurations.json
  rm -rf configurations.json
else
  echo "Failed to Fetch Environment Configurations for "$1
fi


