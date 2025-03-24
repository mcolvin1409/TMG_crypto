FROM node:14-alpine
RUN npm install --global nodemon
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD ["npm", "start"]
