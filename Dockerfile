FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm run compile

COPY ./build ./
COPY ./node_modules ./node_modules

EXPOSE 4000
CMD ["node", "index.js"]