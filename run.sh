#!/bin/bash
# HOST='http://localhost:8080'
HOST='https://api.gosemojs.org'

clear
echo 'Running script'
echo

username=user$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 4 | head -n 1)
password=testar
body="{\"username\":\"$username\",\"password\":\"$password\",\"email\":\"root@localhost.se\"}" 

# Adding user
curl -X POST -s \
  -d "$body" \
  -H "Content-Type: application/json" \
  $HOST/users|jq

# Correct login
echo "Performing correct login"
token=$(curl -X POST -s \
  -d "{\"username\":\"$username\",\"password\":\"$password\"}" \
  -H "Content-Type: application/json" \
  $HOST/users/login|jq -r .token)

echo "Token: $token"
echo

startTime=$(date -u)
endTime=$(date -d '+1 hour' -u)
body="{\"type\":\"run\",\"length\":\"1000\",\"startTime\":\"$startTime\",\"endTime\":\"$endTime\",\"comment\":\"sdflk\"}" 

echo "Add Training"
# Post training
curl -X POST -s \
  -H "Content-Type: application/json" \
  -d "$body" \
  -H "Authorization: Bearer $token" \
  $HOST/training|jq

