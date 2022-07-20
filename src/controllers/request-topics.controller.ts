import {RequestHandler} from 'express';
import requestTopicsServices from '../services/request-topics.services';

const getRequestTopics: RequestHandler = async (_, res) => {
  const topics = await requestTopicsServices.getRequestTopics();

  res.json(topics);
};

const getRequestTopic: RequestHandler = async (req, res) => {
  const {id} = req.params;

  const topic = await requestTopicsServices.getRequestTopic({id: parseInt(id)});

  res.json(topic);
};

const createRequestTopics: RequestHandler = async (req, res) => {
  const {name} = req.body;
  const newRequestTopic = await requestTopicsServices.createRequestTopics({
    name,
  });

  res.json(newRequestTopic);
};

const updateStatusRequestTopics: RequestHandler = async (req, res) => {
  const {status} = req.body;
  const {id} = req.params;

  const updatedRequestTopic =
    await requestTopicsServices.updateStatusRequestTopics({
      requestTopicId: parseInt(id),
      status,
    });

  res.json(updatedRequestTopic);
};

export default {
  getRequestTopics,
  createRequestTopics,
  getRequestTopic,
  updateStatusRequestTopics,
};
