FROM node:20
WORKDIR /the/workdir/path
COPY package*.json index.js ./
RUN npm install
EXPOSE 3000
CMD ["nodemon.cmd", "index.js"]