FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

EXPOSE 8002

CMD ["yarn","run","dev"]