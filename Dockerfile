FROM node:24-alpine@sha256:06d7adf3e0ef61a13f1d28682726366f97a15aa1888c934d3ecec86c33918b53

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
