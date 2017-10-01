FROM node:8.2-alpine

ENV NODE_ENV production

WORKDIR /app

COPY . /app

RUN yarn install

EXPOSE 3000

CMD node server.js