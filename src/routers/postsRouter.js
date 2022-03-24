import { Router } from 'express';
import { GetPosts } from '../controllers/postControler.js';

const postsRouter = Router();
postsRouter.use('/posts', GetPosts);

export default postsRouter;
