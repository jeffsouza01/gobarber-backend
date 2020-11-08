import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';

const sesionsRouter = Router();
const sessionsController = new SessionsController();

sesionsRouter.post('/', sessionsController.create);

export default sesionsRouter;
