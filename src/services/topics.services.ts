import {db} from '../database';
import {Topic} from '../models/Topic';
import {ServerError} from '../errors/server.error';
import {ClientError} from '../errors/client.error';

const topicRepository = db.getRepository(Topic);

const getAllTopics = async () => {
  try {
    const topics = await topicRepository.find();
    return topics;
  } catch (error) {
    console.log(error);
    throw new ServerError();
  }
};

const updateTopicStatus = async (id: number, status: boolean) => {
  let topic: Topic;
  try {
    topic = await topicRepository.findOneBy({
      id: id,
    });
  } catch (error) {
    console.log(error);
    throw new ServerError();
  }
  if (topic === null) {
    throw new ClientError('No topic found with ID ' + id.toString(), 404);
  }
  topic.hotStatus = status;
  try {
    await topicRepository.save(topic);
  } catch (error) {
    console.log(error);
    throw new ServerError();
  }
};

const createTopic = async (params: {topic_name: string}) => {
  try {
    const newTopic = await topicRepository.save({
      topicName: params.topic_name,
      hotStatus: false,
      createdAt: new Date(),
    });

    return newTopic;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export default {getAllTopics, updateTopicStatus, createTopic};
