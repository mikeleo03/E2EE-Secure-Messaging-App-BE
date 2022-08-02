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
  try {
    const report = await reportRepository.findOneOrFail({
      where: {
        id: id,
      },
    });

    return report;
  } catch (error) {
    throw error;
  }
};

const createReport = async (
  chat_id: number,
  reporter_id: number,
  reported_id: number,
  reason: string
) => {
  try {
    const newReport = await reportRepository.save({
      chat_id,
      reporter_id,
      reported_id,
      reason,
    });

    return newReport;
  } catch (error) {
    throw error;
  }
};

export default {getReports, getReportById, createReport};
