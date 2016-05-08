#!/bin/bash

environment=$1

if [[ -n "$environment" ]]; then
    sudo forever --watch --watchDirectory ../codepact/ bin/www
else
    node bin/www
fi
