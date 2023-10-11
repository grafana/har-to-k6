FROM node:18-slim

WORKDIR /converter

COPY . .

RUN npm install
RUN npm run bundle

ENTRYPOINT ["node", "bin/har-to-k6.js", "--stdout"]
