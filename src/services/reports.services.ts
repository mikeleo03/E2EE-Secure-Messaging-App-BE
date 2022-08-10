import {db} from '../database';
import {Report} from '../models';

const reportRepository = db.getRepository(Report);

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
  const newReport = await reportRepository.save({
    chat_id,
    issuer_id,
    reason,
  });

  return newReport;
};

export default {getReports, getReportById, createReport};
