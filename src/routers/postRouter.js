import { Router } from 'express';
import validateAuth from '../middlewares/authValidationMiddleware.js';
import validateSchema from '../middlewares/schemaValidationMiddleware.js';
import * as postSchemas from '../schemas/postSchemas.js';
import * as postController from '../controllers/postController.js';
import { getPosts, getPostsById } from '../controllers/postController.js';

const PostsRoute = new Router();

PostsRoute.use(validateAuth);
PostsRoute.get('/posts', getPosts);
PostsRoute.get('/posts/:id', getPostsById);
PostsRoute.post(
  '/posts',
  validateSchema(postSchemas.newPost),

  postController.create
);
PostsRoute.delete('/posts/:id', postController.remove);
PostsRoute.post('/posts/:id/toggle-like', postController.toggleLikePost);

export default PostsRoute;
