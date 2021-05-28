import * as dotenv from 'dotenv';
import { parse } from 'pg-connection-string';
import { ConnectionOptions } from 'typeorm';

dotenv.config();

const config = parse(
  process.env.DATABASE_URL || 'postgres://:@localhost:5432/',
);

const ormConfig: ConnectionOptions = {
  type: 'postgres',
  host: config.host || 'localhost',
  port: Number(config.port) || 5432,
  username: config.user || '',
  password: config.password || '',
  database: config.database || 'codebench',
  ssl: config.ssl === 'true' || false,
  synchronize: false,
  dropSchema: false,
  migrationsRun: process.env.NODE_ENV === 'production', // run on heroku
  logging: true,
  entities: [`${__dirname}/**/*.entity{.ts,.js}`],
  // allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev
  migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export = ormConfig;
