import * as dotenv from 'dotenv';

dotenv.config();

let redisConfig = {};

if (process.env.REDIS_TLS === 'true') {
  redisConfig = {
    username: process.env.REDIS_USER || '',
    password: process.env.REDIS_PASS || '',
    tls: {
      host: process.env.REDIS_HOST || 'localhost',
      port: Number(process.env.REDIS_PORT) || 6379,
    },
  };
} else {
  redisConfig = {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
    username: process.env.REDIS_USER || '',
    password: process.env.REDIS_PASS || '',
  };
}

export = redisConfig;
