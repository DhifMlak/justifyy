FROM node:lts

COPY package.json .

RUN npm install  

EXPOSE 8080
CMD["node","app.js"]