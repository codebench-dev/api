FROM node:14-buster

RUN apt-get update \
    && apt-get install -y python3-pip \
    && pip3 install pylint \
    && apt-get install -y clang-tidy

RUN curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s v1.41.1 && cp ./bin/golangci-lint /usr/local/bin/golangci-lint

RUN wget https://dl.google.com/go/go1.16.4.linux-amd64.tar.gz \
    && tar -C /usr/local -xzf go1.16.4.linux-amd64.tar.gz \
    && rm go1.16.4.linux-amd64.tar.gz

ENV GOROOT="/usr/local/go"
ENV GOPATH="/go"
ENV PATH="PATH=/go/bin:/usr/local/go/bin:$PATH"

WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

CMD ["npm", "run", "start:prod"]
