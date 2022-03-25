import { Router } from 'express';

import userRouter from './userRouter.js';
import sessionRouter from './sessionRouter.js';
import postsRouter from './postsRouter.js';

const routes = new Router();

routes.use(userRouter);
routes.use(sessionRouter);
routes.use(postsRouter);

export default routes;
