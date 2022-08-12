FROM node:14-alpine as dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

FROM node:14-alpine as builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run compile

FROM node:14-alpine as runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/build ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
EXPOSE 4000
CMD ["node", "index.js"]