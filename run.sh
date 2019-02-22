#!/bin/bash
HOST='http://localhost:8080'
# HOST='https://api.gosemojs.org'

clear
echo 'Running script'
echo

# # Getting root
# curl -s $HOST | jq 

# curl -X POST -s \
  # -d '{"username":"Elmona","password":"testar"}' \
  # -H "Content-Type: application/json" \
  # $HOST/users/login

# Correct login
token=$(curl -X POST -s \
  -d '{"username":"Elmona","password":"testar"}' \
  -H "Content-Type: application/json" \
  $HOST/users/login|jq -r .token)

echo "Token: $token"
# echo

echo "Get user"
# Get user
curl -X GET -s \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $token" \
  $HOST/users/Elmona|jq

# echo "Fail login"
# # Fail login
# curl -X POST -s \
  # -d '{"username":"Elmona","password":"testaisdf"}' \
  # -H "Content-Type: application/json" \
  # $HOST/users/login|jq

# # Adding user
# curl -X POST -s \
  # -d '{"username":"Elmona","password":"testar", "email":"root@localhost.se"}' \
  # -H "Content-Type: application/json" \
  # $HOST/users|jq


