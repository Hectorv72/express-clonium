const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const config = require('./config');

const app = express();
const port = process.env.PORT || 4000;
const server = http.createServer(app);
const io = socketIO(server, config);

module.exports = { server, port, app, io };
