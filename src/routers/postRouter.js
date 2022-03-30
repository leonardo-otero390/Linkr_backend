import { Router } from 'express';
import validateAuth from '../middlewares/authValidationMiddleware.js';
import validateSchema from '../middlewares/schemaValidationMiddleware.js';
import * as postSchemas from '../schemas/postSchemas.js';
import * as postController from '../controllers/postController.js';
import { getPosts, getPostsById } from '../controllers/postController.js';

const PostsRoute = new Router();


PostsRoute.get('/posts', validateAuth, getPosts);
PostsRoute.get('/posts/:id', validateAuth, getPostsById);
PostsRoute.post(
  '/posts',
  validateSchema(postSchemas.newPost),
  validateAuth,
  postController.create
);
PostsRoute.delete('/posts/:id', validateAuth, postController.remove);
PostsRoute.post("/posts/:id/toggle-like", validateAuth, postController.toggleLikePost);
PostsRoute.post('/posts/:id/repost', validateAuth, postController.repost);

export default PostsRoute;
