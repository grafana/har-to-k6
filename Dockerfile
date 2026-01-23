FROM node:20-alpine@sha256:3960ed74dfe320a67bf8da9555b6bade25ebda2b22b6081d2f60fd7d5d430e9c

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
