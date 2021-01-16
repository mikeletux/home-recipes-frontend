from httpd:2.4

ENV HOME_RECIPES_API=http://localhost:8080

COPY . /usr/local/apache2/htdocs/

#Set the right endpoint for the frontend to query
RUN echo "let endpoint = \"$HOME_RECIPES_API\"" > /usr/local/apache2/htdocs/js/api_endpoint.js