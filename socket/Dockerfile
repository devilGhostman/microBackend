FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

EXPOSE 8006

CMD ["yarn","run","dev"]