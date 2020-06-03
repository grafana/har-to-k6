FROM node:12-slim

WORKDIR /converter

COPY . .

RUN yarn
RUN yarn bundle

ENTRYPOINT ["node", "bin/har-to-k6.js"]
