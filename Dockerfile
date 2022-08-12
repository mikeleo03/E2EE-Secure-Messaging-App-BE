FROM node:14-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY ./build ./
COPY ./node_modules ./node_modules

RUN npm run compile

EXPOSE 4000
CMD ["node", "index.js"]