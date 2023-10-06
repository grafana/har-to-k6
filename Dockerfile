FROM node:16-slim

WORKDIR /converter

COPY . .

RUN npm install
RUN npm run bundle

ENTRYPOINT ["node", "bin/har-to-k6.js"]
