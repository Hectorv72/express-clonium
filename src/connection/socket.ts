import SocketGame from '@class/socketgame.class';
import express, { Application } from 'express';
import { createServer, Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import config from './config';
import cors from 'cors';
import morgan from 'morgan';
import gameRoutes from '@routes/game.routes';

const app: Application = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/game', gameRoutes);

export const server : HttpServer = createServer(app);
export const port = 4000;
export const io : Server = new Server(server, config);
export const socketgame = new SocketGame(io);
