import 'reflect-metadata';
import {DataSource} from 'typeorm';
import {Topic, RequestTopic, Chat, Report} from '../models';
import config from '../config';

export const db = new DataSource({
  type: 'postgres',
  host: config.DB.host,
  port: config.DB.port,
  username: config.DB.username,
  password: config.DB.password,
  database: config.DB.database,
  synchronize: true,
  logging: false,
  entities: [Topic, RequestTopic, Chat, Report],
  migrations: [],
  subscribers: [],
});
