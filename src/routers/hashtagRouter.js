import { Router } from 'express';
import validateAuth from '../middlewares/authValidationMiddleware.js';
import * as hashtagController from '../controllers/hashtagController.js';

const routes = new Router();

routes.get('/hashtags/trending', validateAuth, hashtagController.getTrending);

export default routes;
