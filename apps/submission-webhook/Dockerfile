FROM node:18-alpine

WORKDIR /app

COPY package*.json .
    
RUN npm install

ARG DATABASE_URL

ENV DATABASE_URL=${DATABASE_URL}

COPY . .

RUN npx prisma generate

RUN npm run build

CMD ["node","dist/index.js"]
