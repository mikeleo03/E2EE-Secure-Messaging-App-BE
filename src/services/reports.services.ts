import {db} from '../database';
import {Report} from '../models';

const reportRepository = db.getRepository(Report);

const getReports = async () => {
  try {
    const reports = await reportRepository.find();
    return reports;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const getReportById = async (id: number) => {
  try {
    const report = await reportRepository.find({
      where: {
        id: id,
      },
    });

    return report;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getReport = async (
  chat_id: number,
  issuer_id: number,
  issued_id: number,
  reason: string
) => {
  try {
    const newReport = await reportRepository.save({
      chat_id,
      issuer_id,
      issued_id,
      reason,
    });

    return newReport;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default {getReports, getReportById, insertReport: getReport};
