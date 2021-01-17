from httpd:2.4

WORKDIR '/app'

COPY ./start.sh ./
ADD ./app /usr/local/apache2/htdocs/

CMD ["bash", "start.sh"]