import {Request, RequestHandler, Response} from 'express';
import reportsServices from '../services/reports.services';

const getReports: RequestHandler = async (_: Request, res: Response) => {
  const topics = await reportsServices.getReports();

  res.json(topics);
};

const getReportById: RequestHandler = async (
  req: Request<{id: string}>,
  res: Response
) => {
  const id = parseInt(req.params.id);

  if (!isNaN(id) && id > 0) {
    const report = await reportsServices.getReportById(id);

    res.json(report);
  } else {
    res.json([]);
  }
};

const createReport: RequestHandler = async (
  req: Request<
    {},
    {},
    {
      chat_id: number;
      reporter_id: number;
      reported_id: number;
      reason: string;
    }
  >,
  res: Response
) => {
  const body = req.body;
  const newReport = await reportsServices.createReport(
    body.chat_id,
    body.reporter_id,
    body.reported_id,
    body.reason
  );

  res.json(newReport);
};

export default {getReports, getReportById, createReport};
