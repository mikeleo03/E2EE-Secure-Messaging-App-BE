import {IsNull, Not} from 'typeorm';
import {db} from '../database';
import {Report, Chat} from '../models';

const reportRepository = db.getRepository(Report);
const chatRepository = db.getRepository(Chat);

const getReports = async () => {
  try {
    const reports = await reportRepository.find();
    return reports;
  } catch (err) {
    throw new Error('Unable to get reports');
  }
};

const getReportById = async (id: number) => {
  const report = await reportRepository.findOneOrFail({
    where: {
      id: id,
    },
  });

  return report;
};

const createReport = async (
  chat_id: string,
  issuer_id: string,
  reason: string
) => {
  const issuedChat = await chatRepository.findOneOrFail({
    where: {
      chat_id: chat_id,
    },
  });

  const issuedUserId =
    issuedChat.user_id1 === issuer_id
      ? issuedChat.user_id2
      : issuedChat.user_id1;

  const newReport = await reportRepository.save({
    chat_id: chat_id,
    issuer_id: issuer_id,
    issued_id: issuedUserId,
    reason: reason,
  });

  return newReport;
};

const markReport = async (id: number, seenBy: string) => {
  const report = await reportRepository.save({
    id,
    seen_by: seenBy,
  });

  return report;
};

const getSeenReports = async () => {
  const reports = await reportRepository.find({
    where: {
      seen_by: Not(IsNull()),
    },
  });

  return reports;
};

const getUnseenReports = async () => {
  const reports = await reportRepository.find({
    where: {
      seen_by: IsNull(),
    },
  });

  return reports;
};

export default {
  getReports,
  getReportById,
  createReport,
  markReport,
  getSeenReports,
  getUnseenReports,
};
