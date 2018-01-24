FROM node:6
WORKDIR /usr/src/app
COPY package.json ./
EXPOSE 4200
RUN npm install
COPY . .
CMD [ "npm", "start" ]