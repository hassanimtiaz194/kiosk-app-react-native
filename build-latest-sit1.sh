#!/usr/bin/env bash
if ./setup-configs.sh sit1; then
  echo "Environment Configurations ready to use."
fi
echo "Pulling Latest Codebase"
git pull
echo "Creating Bundle"
./create-bundle.sh $1 $2
