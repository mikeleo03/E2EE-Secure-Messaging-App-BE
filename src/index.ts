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

app.use(
  cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200,
    maxAge: 0,
  })
);

app.options('*', cors());

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Initialize routes
routes(app);

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  },
});

httpServer.listen(config.port, config.host, async () => {
  // Initialize db
  await db.initialize();

  console.log(`🚀 Server is listening on http://${config.host}:${config.port}`);

  // const pubClient = createClient({url: 'redis://localhost:6379'});
  // const subClient = pubClient.duplicate();

  // io.adapter(createAdapter(pubClient, subClient));

  socket({io});
});
