import { socketgame } from '@connection/socket';
import { Request, Response } from 'express';
import Game, { IObjectGame } from '@class/game.class';

export const createGame = async (req : Request, res : Response) => {
  const { width, height, max_players } = req.body;
  console.log(req.body);
  // const data = { width, height, max_players };

  // try {
  //   const created_game : Game = await socketgame.addGameRoom(data);
  //   const game : IObjectGame = created_game.getObjectGame();
  //   res.status(200).json({ game });
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).json({ msg: 'error al crear la sala' });
  // }
};
