#!/bin/sh
curl -s http://localhost:8080 | jq 

# Correct login
curl -X POST -s \
	-d '{"username":"Elmona","password":"test"}' \
	-H "Content-Type: application/json" \
	http://localhost:8080/users/login | jq 

# Fail login
curl -X POST -s -i \
	-d '{"username":"Elmona","password":"testar"}' \
	-H "Content-Type: application/json" \
	http://localhost:8080/users/login | jq 
