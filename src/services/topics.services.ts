import {Topic} from '../models';
import {db} from '../database';

const topicRepository = db.getRepository(Topic);

const getTopics = async () => {
  try {
    const topics = await topicRepository.find();
    return topics;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const createTopic = async (params: {topic_name: string}) => {
  try {
    const newTopic = await topicRepository.save({
      topic_name: params.topic_name,
      hot_status: false,
      created_at: new Date(),
    });

    return newTopic;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export default {getTopics, createTopic};
