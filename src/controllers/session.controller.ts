import {RequestHandler} from 'express';
import sessionServices from '../services/session.services';

const getSession: RequestHandler = async (req, res) => {
  try {
    const isLoggedin = await sessionServices.checkSession(req.username);
    res.json({canConnect: !isLoggedin});
  } catch (error) {
    res.status(404).json('Error: cannot retreive sessions');
  }
};

export default {getSession};
