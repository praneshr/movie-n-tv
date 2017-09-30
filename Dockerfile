FROM node:8.2-alpine

ENV NODE_ENV production

EXPOSE 3000

WORKDIR /app

ADD . /app

CMD node server.js