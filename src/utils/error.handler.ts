import { Response } from "express"

const handleResponseError = (res: Response, error: any) => {
  if (error.response != null && typeof error.response != 'undefined') {
    const response = error.response;
    if (response.status === 401){
      res.sendStatus(401);
      return;
    }
  }
  if (error.message != null && typeof error.response != 'undefined') {
    res.status(500).send(error.message);
    return;
  }
  res.sendStatus(500);
}

export default {
  handleResponseError,
};

