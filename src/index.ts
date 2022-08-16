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
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'GET,HEAD,PUT,POST,OPTIONS,UPDATE,DELETE'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, token'
  );
  next();
});

// app.use(
//   cors({
//     origin: '*',
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
//   })
// );

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
