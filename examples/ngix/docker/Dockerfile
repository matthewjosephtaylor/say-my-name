FROM ubuntu:20.04

RUN apt-get update 
RUN apt-get install -y nginx

COPY nginx.conf /etc/nginx/sites-enabled/localhost
CMD nginx \
    && tail -f /var/log/nginx/*