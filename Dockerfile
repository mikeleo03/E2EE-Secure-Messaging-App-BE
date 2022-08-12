FROM node:14-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY ./node_modules ./node_modules

RUN npm run compile

COPY ./build ./

EXPOSE 4000
CMD ["node", "index.js"]