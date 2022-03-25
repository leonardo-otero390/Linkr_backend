import { Router } from 'express';

import userRouter from './userRouter.js';
import sessionRouter from './sessionRouter.js';

const routes = new Router();

routes.use(userRouter);
routes.use(sessionRouter);

export default routes;
