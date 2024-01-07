FROM node:18-alpine

WORKDIR /usr/src/index

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["node", "dist/main"]
