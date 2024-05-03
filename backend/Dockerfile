FROM node:16-alpine

WORKDIR /app

COPY package.json .

RUN npm i
COPY . .

EXPOSE 3005

CMD ["npm", "start"]
