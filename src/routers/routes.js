import { Router } from 'express';
import userRouter from './userRouter.js';

const routes = new Router();

routes.use(userRouter);

export default routes;
