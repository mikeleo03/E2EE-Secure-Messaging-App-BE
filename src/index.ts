import * as express from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';
import {db} from './database';
import config from './config';

import socket from './socket';
import routes from './routes';
import {ClientToServerEvents, ServerToClientEvents} from './socket/interface';

const app = express();

console.log(config.corsOrigin);

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Initialize routes
routes(app);

// SAMPLE COMMENT: Comment added.

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    credentials: false,
  },
});

httpServer.listen(config.port, config.host, async () => {
  // Initialize db
  await db.initialize();

  console.log(`🚀 Server is listening on http://${config.host}:${config.port}`);

  socket({io});
});
