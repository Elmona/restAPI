#!/bin/bash
HOST='http://localhost:8080'
# HOST='https://api.gosemojs.org'

clear
echo 'Running script'
echo

# Getting root
curl -s $HOST | jq 

# Correct login
echo "Performing correct login"
token=$(curl -X POST -s \
  -d '{"username":"Elmona","password":"testar"}' \
  -H "Content-Type: application/json" \
  $HOST/users/login|jq -r .token)

echo "Token: $token"
# echo

startTime=$(date -u)
endTime=$(date -d '+1 hour' -u)
body="{\"username\":\"Elmona\",\"type\":\"Running\",\"length\":\"100\",\"startTime\":\"$startTime\",\"endTime\":\"$endTime\",\"comment\":\"sdflk\"}" 

echo "Add Training"
# Post training
curl -X POST -s \
  -H "Content-Type: application/json" \
  -d "$body" \
  -H "Authorization: Bearer $token" \
  $HOST/training|jq

# echo "Get Training"
# # Post training
# curl -X GET -s \
  # -H "Content-Type: application/json" \
  # -H "Authorization: JWT $token" \
  # $HOST/training|jq

# echo "Delete Training"
# # Delete training
# curl -X DELETE -s \
  # -H "Content-Type: application/json" \
  # -H "Authorization: JWT $token" \
  # -d '{"id":"5c713b85cbed3f02e1d7a997"}' \
  # $HOST/training|jq

# echo "Get user"
# # Get user
# curl -X GET -s \
  # -H "Content-Type: application/json" \
  # -H "Authorization: Bearer $token" \
  # $HOST/users/Elmona2|jq

# echo "Fail login"
# # Fail login
# curl -X POST -s \
  # -d '{"username":"Elmona","password":"testaisdf"}' \
  # -H "Content-Type: application/json" \
  # $HOST/users/login|jq

# # Adding user
# curl -X POST -s \
  # -d '{"username":"Elmona2","password":"testar", "email":"root@localhost.se"}' \
  # -H "Content-Type: application/json" \
  # $HOST/users|jq

# echo "Get user"
# # Get user
# curl -X GET -s \
  # -H "Content-Type: application/json" \
  # -H "Authorization: Bearer $token" \
  # $HOST/users/Elmona2|jq

# # Add Hook
# curl -X POST -s \
  # -d '{"url":"http://68131b3b.eu.ngrok.io/webHook"}' \
  # -H "Content-Type: application/json" \
  # -H "Authorization: Bearer $token" \
  # $HOST/hooks|jq

# GET Hooks
curl -X GET -s \
  -H "Content-Type: application/json" \
  -H "Authorization: JWT $token" \
  $HOST/hooks|jq

# # Delete Hook
# curl -X DELETE -s \
  # -d '{"id":"5c72e2739e2e47018309f598"}' \
  # -H "Content-Type: application/json" \
  # -H "Authorization: JWT $token" \
  # $HOST/hooks|jq

# # Delete user
# curl -X DELETE -s \
  # -H "Content-Type: application/json" \
  # -H "Authorization: JWT $token" \
  # $HOST/users|jq
