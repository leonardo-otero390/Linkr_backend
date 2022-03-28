import { Router } from 'express';
import validateSchema from '../middlewares/schemaValidationMiddleware.js';
import * as postSchemas from '../schemas/postSchemas.js';
import * as postController from '../controllers/postController.js';
import { getPosts, getPostsById } from '../controllers/postController.js';
import validateAuth from '../middlewares/authValidationMiddleware.js';

const PostsRoute = new Router();

PostsRoute.get('/posts', getPosts);
PostsRoute.get('/posts/:id', getPostsById);
PostsRoute.post(
  '/posts',
  validateAuth,
  validateSchema(postSchemas.newPost),
  postController.create
);

export default PostsRoute;
