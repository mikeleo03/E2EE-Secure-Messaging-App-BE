import * as express from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';
import * as config from 'config';
import socket from './socket';
import routes from './routes';

const app = express();

const host = config.get<string>('host');
const port = config.get<number>('port');
// const corsOrigin = config.get<string>('corsOrigin');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Initialize routes
routes(app);

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    credentials: false,
  },
});

httpServer.listen(port, host, () => {
  console.log(`🚀 Server is listening on http://${host}/${port}`);

  socket({io});
});
