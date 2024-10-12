FROM node:lts-slim

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD ["npm", "run", "start:dev"]