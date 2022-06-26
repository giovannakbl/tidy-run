FROM node:16-bullseye

RUN mkdir /app

COPY package.json package-lock.json /app/

WORKDIR /app

RUN npm install

CMD ["npm", "start"]
