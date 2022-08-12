FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm run compile

COPY ./build .

EXPOSE 4000
CMD ["node", "index.js"]