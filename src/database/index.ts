import 'reflect-metadata';
import {DataSource} from 'typeorm';
import config from '../config';
import {
  Chat,
  Message,
  Report,
  RequestTopic,
  Topic,
  Quota,
  BannedUser,
  Session,
  SharedKey
} from '../models';

export const db = new DataSource({
  type: 'postgres',
  host: config.DB.host,
  port: config.DB.port,
  username: config.DB.username,
  password: config.DB.password,
  database: config.DB.database,
  synchronize: true,
  logging: false,
  entities: [
    Topic,
    RequestTopic,
    Chat,
    Report,
    Message,
    Quota,
    BannedUser,
    Session,
    SharedKey
  ],
  migrations: [],
  subscribers: [],
  // ssl: {
  //   rejectUnauthorized: false,
  // },
});
