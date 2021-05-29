FROM node:16 AS builder

ENV NODE_ENV production
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build


FROM node:16-alpine

WORKDIR /app
COPY --from=builder /app ./
CMD ["npm", "run", "start:prod"]
