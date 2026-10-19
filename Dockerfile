FROM node:24-alpine@sha256:44fce696f38ba8c987c4db89954051000bbd05ffd8d8659ba15ed4a8602e937f

WORKDIR /converter

# Install dependencies
COPY package.json package-lock.json ./
COPY webpack.config.js .editorconfig .eslintignore .prettierignore ./
COPY src src
COPY typings typings
COPY LICENSE ./
RUN npm ci

# Bundle app source
RUN npm run bundle

# Bundle bin source
COPY bin bin
ENTRYPOINT ["node", "bin/har-to-k6.js", "--stdout"]
