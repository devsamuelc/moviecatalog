FROM node

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 3334

CMD [ "node", "dist/main.js" ]