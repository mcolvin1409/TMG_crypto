#!/bin/sh


curl -X POST http://localhost:5000/auth/initialize \
    -H "Content-Type: application/json"  \
    -d '{"password": "'$1'"}'  
