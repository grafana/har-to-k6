FROM node:20-alpine@sha256:643e7036aa985317ebfee460005e322aa550c6b6883000d01daefb58689a58e2

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
