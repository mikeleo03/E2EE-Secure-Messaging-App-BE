import {Response} from 'express';

const handleResponseError = (res: Response, error: any) => {
  console.log(error);
  console.log(typeof error.response);

  if (error.response != null && typeof error.response !== 'undefined') {
    console.log('or here');
    const response = error.response;
    if (response.status === 401) {
      res.sendStatus(401);
      return;
    }
  }
  if (error.message != null && typeof error.response !== 'undefined') {
    console.log('here');

    res.status(500).send(error.message);
    return;
  }
  console.log('and here');
  res.sendStatus(500);
};

export default {
  handleResponseError,
};
