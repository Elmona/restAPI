#!/bin/sh
HOST='http://localhost:8080'
# HOST='https://api.gosemojs.org'

# # Getting root
# curl -s $HOST | jq 

# Correct login
token=$(curl -X POST -s \
  -d '{"username":"Elmona","password":"testar"}' \
  -H "Content-Type: application/json" \
  $HOST/users/login|jq -r .token)

echo $token

# Get user
curl -X GET -s \
  -H "Content-Type: application/json" \
  -H "Authorization: $token" \
  $HOST/users/Elmona|jq

# # Fail login
# curl -X POST -s \
  # -d '{"username":"Elmona","password":"testaisdf"}' \
  # -H "Content-Type: application/json" \
  # $HOST/users/login|jq

# # Adding user
# curl -X POST -s \
  # -d '{"username":"Elmona4","password":"testar", "email":"root@localhost.se"}' \
  # -H "Content-Type: application/json" \
  # $HOST/users|jq


