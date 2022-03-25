import { Router } from 'express';
import { GetPosts } from '../controllers/postControler.js';
import validateAuth from '../middlewares/authValidationMiddleware.js';

const postsRouter = Router();
postsRouter.use('/posts', validateAuth, GetPosts);

export default postsRouter;
