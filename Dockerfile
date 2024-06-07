FROM node:21.5.0-alpine
WORKDIR /usr/src/app
COPY . .
RUN npm install -g gulp
RUN npm install --force
RUN npm run build
EXPOSE 3000
CMD "npm" "start"