FROM node:20-alpine@sha256:658d0f63e501824d6c23e06d4bb95c71e7d704537c9d9272f488ac03a370d448

WORKDIR /converter

# Install dependencies
COPY package.json package-lock.json ./
COPY webpack.config.js .editorconfig .eslintignore .prettierignore ./
COPY src src
COPY typings typings
COPY LICENSE ./
RUN npm install

# Bundle app source
RUN npm run bundle

# Bundle bin source
COPY bin bin
ENTRYPOINT ["node", "bin/har-to-k6.js", "--stdout"]
