// import Chip from './class/chip.class';
// import Board from './class/board.class';
// import Player from './class/player.class';
// import Game from './class/game.class';
import { io, port } from './connection/socket';

io.listen(port);

// const board = new Board(5, 5);

// const lista = [
//   new Player(1, 'Hector', 'rojo', 1),
//   new Player(1, 'Juan', 'azul', 2)
// ];

// const game = new Game(lista, board, 'asd45', 1);

// console.log(game.getObjectGame().gameboard.board);

// console.log(board.getBox(4, 0)?.addChip(new Chip(player)));
// console.log(board.getBox(4, 0)?.getDataBox());
// console.log(board.getBox(8, 5));
