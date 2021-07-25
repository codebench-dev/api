FROM node:14 AS builder

WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

RUN apt-get update \
    && apt-get install -y python3-pip \
    && pip3 install pylint

RUN curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s v1.41.1 && cp ./bin/golangci-lint /usr/local/bin/golangci-lint

CMD ["npm", "run", "start:prod"]
