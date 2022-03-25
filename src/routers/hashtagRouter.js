import { Router } from 'express';
import validateAuth from '../middlewares/authValidationMiddleware';
import * as hashtagController from '../controllers/hashtagController';

const routes = new Router();

routes.get('/trending', validateAuth, hashtagController.getTrending);

export default routes;
