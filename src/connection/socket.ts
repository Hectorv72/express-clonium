import express, { Application } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import config from './config';

const app: Application = express();
const server = createServer(app);
export const port = 4000;
export const io = new Server(server, config);
