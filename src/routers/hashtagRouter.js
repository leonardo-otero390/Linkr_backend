import { Router } from 'express';
import validateAuth from '../middlewares/authValidationMiddleware.js';
import * as hashtagController from '../controllers/hashtagController.js';

const routes = new Router();

routes.get('/trending', validateAuth, hashtagController.getTrending);
routes.get('/:name/posts', validateAuth, hashtagController.getPostsByHashtag);

export default routes;
