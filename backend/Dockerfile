FROM node:12.16.1-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 4000

CMD [ "yarn", "dev" ]