import { Router } from 'express';
import postRouter from './postRouter.js';
import hashtagRouter from './hashtagRouter.js';
import userRouter from './userRouter.js';
import sessionRouter from './sessionRouter.js';

const routes = new Router();

routes.get('/health', async (req, res) => {
  res.sendStatus(200);
});
routes.use(userRouter);
routes.use(sessionRouter);
routes.use(hashtagRouter);
routes.use(postRouter);

export default routes;
