import { Router } from 'express';
import postsRouter from './postsRouter.js';

import userRouter from './userRouter.js';

const routes = new Router();

routes.use(userRouter);
routes.use(postsRouter);

export default routes;
