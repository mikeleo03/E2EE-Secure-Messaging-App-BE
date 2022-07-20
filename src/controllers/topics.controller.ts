import {RequestHandler} from 'express';
import topicsServices from '../services/topics.services';

const getTopics: RequestHandler = async (_, res) => {
  const topics = await topicsServices.getTopics();

  res.json(topics);
};

export default {getTopics};
