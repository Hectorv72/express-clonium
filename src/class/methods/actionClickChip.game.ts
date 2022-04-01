import Player from '@class/player.class';
import Box from '@class/box.class';
import { IGame } from '@class/game.class';

export const actionClickChip = (game: IGame, player: Player, row: number, col: number) : Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const { players, turn, gameboard } = game;
    const validation_player_in_game = players.some((element: Player) => element.name === player.name);

    if (validation_player_in_game) {
      if (player.turn === turn) {
        const box : Box | undefined = gameboard.getPositionBox(row, col);
        if (box) {
          if (box.chip) {
            if (box.chip.player?.name === player.name) {
              box.addChip(player);
              return resolve(true);
            } else {
              console.log('chip is same the player => false');
            }
          } else {
            console.log('chip existence => false');
          }
        } else {
          console.log('box existence => false');
        }
      }
      return resolve(false);
    }
    return reject(new Error('no es un jugador de la sala'));
  });
};
