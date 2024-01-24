#!/usr/bin/env bash
if ./setup-configs.sh prod; then
  echo "Environment Configurations ready to use."
# else
#   echo "Failed to setup environment configurations. Please retry"
#   exit 1
fi
if  [[ $1 = "-android" ]]; then
    echo "Cleaning Android project"
    cd android
    ./gradlew clean
    cd ..
fi
echo "Pulling Latest Codebase"
git pull
echo "Updating Shared Module"
./update-shared-module.sh
echo "Creating Bundle"
./create-bundle.sh $1 $2
