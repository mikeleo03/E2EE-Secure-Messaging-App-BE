import {RequestHandler} from 'express';
import reportsServices from '../services/reports.services';

const getReports: RequestHandler = async (_, res) => {
  const topics = await reportsServices.getReports();

  res.json(topics);
};

const getReportById: RequestHandler = async (req, res) => {
  const id = parseInt(req.query.id as string);
  const reports = await reportsServices.getReportById(id);

  res.json(reports);
};

const createReport: RequestHandler = async (req, res) => {
  const body = req.body;

  console.log(body);

  // res.json(report);
};

export default {getReports, getReportById, createReport};
