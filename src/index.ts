// import Board from '@class/board.class';
// import Player from '@class/player.class';
// import Game from '@class/game.class';
import { io, server, port } from '@connection/socket';
import { connection } from 'listeners';

// io.on('connection')

server.listen(port);
// io.listen(port);
io.on('connection', connection);
// io.in('asd').emit('aa', 'probando');
// console.log('socket rooms =>', io.sockets.adapter.rooms);

// const run = async () => {
//   const board = new Board(5, 5);

//   const lista = [
//     new Player(1, 'Hector', 'rojo', 1),
//     new Player(2, 'Juan', 'azul', 2)
//   ];

//   const game = new Game(lista, board, 'asd45', 1);

//   game.getGame().gameboard.getPositionBox(1, 1)?.addChip(lista[0]);
//   game.getGame().gameboard.getPositionBox(4, 4)?.addChip(lista[1]);

//   console.log('primer entrada');
//   await game.actionClickChip(lista[0], 1, 1);
//   console.log('segunda entrada');
//   await game.actionClickChip(lista[1], 4, 4);
// };

// run();
