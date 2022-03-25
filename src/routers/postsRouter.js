import { Router } from 'express';
import { GetPosts, getPostsId } from '../controllers/postControler.js';
import validateAuth from '../middlewares/authValidationMiddleware.js';

const postsRouter = Router();
postsRouter.get('/posts', GetPosts);
postsRouter.get('/posts/:id', getPostsId);

export default postsRouter;
