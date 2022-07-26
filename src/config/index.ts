// eslint-disable-next-line node/no-unpublished-import
import * as dotenv from 'dotenv';
dotenv.config({path: __dirname + './../.env'});

export default {
  port: Number(process.env.PORT) || 4000,
  host: process.env.HOST || 'localhost',
  mainApiUrl: process.env.MAIN_API_URL || 'http://localhost:1337/api',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  DB: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'test',
    password: process.env.DB_PASSWORD || 'test',
    database: process.env.DB_DATABASE || 'test',
  },
};
