import {RequestTopic} from '../models';
import {RequestTopicStatus} from '../models/RequestTopic';
import {db} from '../database';
import topicService from './topics.services';
// import { createTopic } from './topics.services';

const requestTopicsRepository = db.getRepository(RequestTopic);

const getRequestTopics = async () => {
  try {
    const requestTopics = await requestTopicsRepository.find();
    return requestTopics;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getRequestTopic = async (params: {id: number}) => {
  try {
    const requestTopic = await requestTopicsRepository.findOne({
      where: {
        id: params.id,
      },
    });

    return requestTopic;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const createRequestTopics = async (params: {name: string}) => {
  try {
    const newRequestTopics = await requestTopicsRepository.save({
      name: params.name,
      status: RequestTopicStatus.PENDING,
      created_at: new Date(),
    });

    return newRequestTopics;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const updateStatusRequestTopics = async (params: {
  requestTopicId: number;
  status: RequestTopicStatus;
}) => {
  try {
    const requestTopic = await requestTopicsRepository.findOne({
      where: {
        id: params.requestTopicId,
      },
    });

    const updatedRequestTopic = await requestTopicsRepository.save({
      ...requestTopic,
      status: params.status,
    });

    if (updatedRequestTopic.status === RequestTopicStatus.APPROVED) {
      await topicService.createTopic({
        topic_name: updatedRequestTopic.name,
      });
    }

    return updatedRequestTopic;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default {
  getRequestTopics,
  createRequestTopics,
  updateStatusRequestTopics,
  getRequestTopic,
};
