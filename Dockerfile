FROM node:8.4.0

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

ENV NODE_ENV production

WORKDIR /app

ADD package.json /app
ADD yarn.lock /app

RUN NODE_ENV=default yarn install

COPY . /app

RUN yarn run build

EXPOSE 3000

CMD node server.js