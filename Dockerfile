FROM node:18-alpine

# Upgrade nom
RUN npm install -g npm@latest
RUN npm install -g typescript
