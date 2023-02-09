FROM node:18-alpine

# Upgrade nom
RUN npm install -g npm@latest
RUN npm install -g typescript

RUN apk update
RUN apk add git ctags

