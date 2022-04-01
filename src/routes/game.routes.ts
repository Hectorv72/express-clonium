import { createGame } from '@controllers/game.controllers';
import { Request, Response, Router } from 'express';
const routes = Router();

routes.get('/', (req : Request, res : Response) => { res.status(200).json({ msg: 'funca' }); });
routes.post('/', createGame);

export default routes;
