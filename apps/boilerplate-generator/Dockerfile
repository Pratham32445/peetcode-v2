FROM node:18-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

ARG REDIS_URL

ENV REDIS_URL=${REDIS_URL}

COPY . .

RUN npm run build

CMD ["node" ,"dist/index.js"]

