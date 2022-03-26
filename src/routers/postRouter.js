import { Router } from 'express';
import validateSchema from '../middlewares/schemaValidationMiddleware.js';
import * as postSchemas from '../schemas/postSchemas.js';
import * as postController from '../controllers/postController.js';
import validateAuth from '../middlewares/authValidationMiddleware.js';
import { GetPosts } from '../controllers/postControler.js';

const routes = new Router();

routes.get('/', validateAuth, GetPosts);

routes.post(
  '/',
  validateAuth,
  validateSchema(postSchemas.newPost),
  postController.create
);

routes.delete('/:id', validateAuth, postController.remove);

export default routes;
