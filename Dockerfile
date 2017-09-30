FROM node:8.4.0

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

WORKDIR /app

ADD package.json /app
ADD yarn.lock /app

RUN NODE_ENV=default yarn install

COPY . /app

RUN NODE_ENV=production ACCESS_KEY=$ACCESS_KEY SECRET_KEY=$SECRET_KEY yarn run build

EXPOSE 3000

CMD node server.js