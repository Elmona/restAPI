#!/bin/sh
# HOST='http://localhost:8080'
HOST='https://api.gosemojs.org'

# Getting root
curl -s $HOST | jq 

# Correct login
curl -X POST -s \
  -d '{"username":"Elmona","password":"testar"}' \
  -H "Content-Type: application/json" \
  $HOST/users/login

# Fail login
curl -X POST -s \
  -d '{"username":"Elmona","password":"testaisdf"}' \
  -H "Content-Type: application/json" \
  $HOST/users/login

# Get user
curl -X GET -s \
  $HOST/users/Elmona

Adding user
curl -X POST -s \
  -d '{"username":"Elmona","password":"testar", "email":"root@localhost.se"}' \
  -H "Content-Type: application/json" \
  $HOST/users


