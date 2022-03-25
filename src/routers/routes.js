import { Router } from 'express';
import userRouter from './userRouter.js';
import sessionRouter from './sessionRouter.js';
import postRouter from './postRouter.js';

const routes = new Router();

routes.get('/health', async (req, res) => {
  res.sendStatus(200);
});
routes.use('/posts', postRouter);
routes.use(userRouter);
routes.use(sessionRouter);

export default routes;
