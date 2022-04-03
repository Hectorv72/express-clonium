import Box from '@class/box.class';
import Board from '@class/board.class';
import Player from '@class/player.class';
import { IGame } from '@class/game.class';

// ejecuta la accion de agregar una ficha a la casilla
const addChipPosition = (board : Board, player : Player | undefined, row : number, col : number) => {
  const box = board.getPositionBox(row, col);
  if (player) {
    box?.addChip(player);
  }
};

// Verifica la posicion de la ficha y le agrega una ficha/punto a los adyacentes
const multiplicateChip = (board : Board, box : Box, player : Player | undefined) => {
  const { row, col } = box.getBox();
  const { width, height } = board.getBoard();

  if (box.chip?.value === 4) {
    box.removeChip();
  }

  if (row > 0) { // agrega un punto/ficha a la casilla de arriba
    addChipPosition(board, player, row - 1, col);
  }
  if (row < height - 1) { // agrega un punto/ficha a la casilla de abajo
    addChipPosition(board, player, row + 1, col);
  }
  if (col > 0) { // agrega un punto/ficha a la casilla de la izquierda
    addChipPosition(board, player, row, col - 1);
  }
  if (col < width - 1) { // agrega un punto/ficha a la casilla de la derecha
    addChipPosition(board, player, row, col + 1);
  }
};

// Funcion que recorre la lista esperando encontrar cambios
export const watchChanges = (game : IGame) => {
  const { gameboard } = game;
  const { board: list } = gameboard;
  const multipliables : Array<Box> = [];

  // Recorre la board buscando fichas con mas de 3 puntos
  list.forEach(
    (rows : Box[]) =>
      rows.forEach(
        (box : Box) => {
          if (box.chip) {
            if (box.chip.value > 3) {
              multipliables.push(box);
              // console.log('chip => ', box.chip);
            }
          }
        }
      )
  );

  // console.log('multiplicables =>', multipliables.length);

  if (multipliables.length > 0) {
    multipliables.forEach(
      (box : Box) =>
        multiplicateChip(gameboard, box, box.chip?.player)
    );
    // io.to(game.room).emit('update-board');
    watchChanges(game);
  }
};
