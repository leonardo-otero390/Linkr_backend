import { Router } from 'express';
import postsRouter from './postsRouter.js';

const routes = new Router();

routes.use(postsRouter);

export default routes;
