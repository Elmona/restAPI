#!/bin/ash
set -e

echo "Starting in $NODE_ENV environment"
if [ "$NODE_ENV" == "development" ]
then
  npm run dev
else
  # Let the Database start before running the node application.
  sleep 5
  npm run start
fi
