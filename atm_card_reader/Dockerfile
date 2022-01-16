FROM node:16

WORKDIR /atm_card_reader

COPY src src

COPY package.json .

COPY private.key .

COPY .env .

RUN npm install

EXPOSE 3001

CMD ["npm", "start"]