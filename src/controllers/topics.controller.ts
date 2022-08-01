import {RequestHandler} from 'express';
import topicsServices from '../services/topics.services';

const getAllTopics: RequestHandler = async (_, res) => {
  try {
    const data = await topicsServices.getAllTopics();
    res.send({data: data});
  } catch (error) {
    res.status(error.status).send({message: error.message});
  }
};

const updateStatusTopics: RequestHandler = async (req, res) => {
  if (typeof req.body.status !== 'boolean') {
    res.status(400).send({message: 'Request body type error'});
    return;
  }

  try {
    await topicsServices.updateTopicStatus(
      parseInt(req.params.id),
      req.body.status
    );
    res.send();
  } catch (error) {
    res.status(error.status).send({message: error.message});
  }
};

export default {getAllTopics, updateStatusTopics};
