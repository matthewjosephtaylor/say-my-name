FROM ubuntu:20.04

RUN apt-get update 
RUN apt-get install -y openssl
RUN apt-get install -y nginx
RUN apt-get install -y curl 
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs
RUN apt-get install -y dnsutils
RUN apt-get install -y lsof


RUN mkdir /app
COPY app/main.js /app
ADD app/scripts.tgz /app

# Uncomment to verify dependencies
# RUN node -v 
# RUN nginx -v 
# RUN openssl version

# Test application
WORKDIR /app
RUN node --enable-source-maps /app/main.js --test all

CMD node --enable-source-maps /app/main.js
# CMD /app/main.js