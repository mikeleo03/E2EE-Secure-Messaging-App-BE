import * as express from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';
import {db} from './database';
import config from './config';
import socket from './socket';
import routes from './routes';
// eslint-disable-next-line node/no-extraneous-import
import * as cors from 'cors';
import {createClient} from 'redis';
import {createAdapter} from '@socket.io/redis-adapter';

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

  const pubClient = createClient({url: 'redis://localhost:6379'});
  const subClient = pubClient.duplicate();

  io.adapter(createAdapter(pubClient, subClient));

  socket({io});
});
