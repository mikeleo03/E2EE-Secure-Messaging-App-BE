import * as express from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';
import {db} from './database';
import config from './config';
import socket from './socket';
import routes from './routes';
// eslint-disable-next-line node/no-extraneous-import
import * as cors from 'cors';

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({origin: config.corsOrigin}));

// Initialize routes
routes(app);

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    credentials: true,
    origin: config.corsOrigin,
  },
});

httpServer.listen(config.port, config.host, async () => {
  // Initialize db
  await db.initialize();

  console.log(`🚀 Server is listening on http://${config.host}:${config.port}`);

  socket({io});
});
