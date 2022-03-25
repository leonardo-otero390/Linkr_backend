import { Router } from 'express';
import postRoutes from './postsRoutes.js';

import userRouter from './userRouter.js';
import sessionRouter from './sessionRouter.js';

const routes = new Router();

routes.get('/health', async (req, res) => {
  res.sendStatus(200);
});
routes.use('/posts', postRoutes);
routes.use(userRouter);
routes.use(sessionRouter);

export default routes;
