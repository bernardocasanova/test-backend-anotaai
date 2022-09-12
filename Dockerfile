FROM node:alpine

LABEL maintainer="Bernardo Casanova"

WORKDIR /usr/src/app

# install app dependencies
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]
