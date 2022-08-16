import {Request, RequestHandler, Response} from 'express';
import reportsServices from '../services/reports.services';
import errorHandler from '../utils/error.handler';

const getReports: RequestHandler = async (_: Request, res: Response) => {
  try {
    const reports = await reportsServices.getReports();

    res.json({
      reports: reports,
    });
  } catch (error) {
    errorHandler.handleResponseError(res, error);
  }
};

const getReportById: RequestHandler = async (
  req: Request<{id: string}>,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);

    if (!isNaN(id) && id > 0) {
      const report = await reportsServices.getReportById(id);

      res.json({
        report: report,
      });
    } else {
      res
        .status(400)
        .send('Report ID is not valid, ID must be an integer and > 0');
    }
  } catch (error) {
    errorHandler.handleResponseError(res, error);
  }
};

const createReport: RequestHandler = async (
  req: Request<
    {},
    {},
    {
      chat_id: string;
      issuer_id: string;
      reason: string;
    }
  >,
  res: Response
) => {
  try {
    const body = req.body;
    const newReport = await reportsServices.createReport(
      body.chat_id,
      body.issuer_id,
      body.reason
    );

    res.json({
      report: newReport,
    });
  } catch (error) {
    errorHandler.handleResponseError(res, error);
  }
};

const markReport: RequestHandler = async (req: Request, res: Response) => {
  try {
    const {id, seen} = req.body;

    const response = await reportsServices.markReport(id, seen);

    res.json(response);
  } catch (error) {
    errorHandler.handleResponseError(res, error);
  }
};

const getReportsBySeen: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const seen = req.query.seen === 'true';

    const response = await reportsServices.getReportsBySeen(seen);

    res.json({
      reports: response,
    });
  } catch (error) {
    errorHandler.handleResponseError(res, error);
  }
};

export default {
  getReports,
  getReportById,
  createReport,
  markReport,
  getReportsBySeen,
};
