FROM node:20
WORKDIR /code
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD node ./bin/www