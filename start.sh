#!/bin/bash

#Set API endpoint
echo "let endpoint = \"$HOME_RECIPES_API\"" > /usr/local/apache2/htdocs/js/api_endpoint.js

#start web server
httpd-foreground