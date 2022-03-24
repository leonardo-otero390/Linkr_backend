import { Router } from 'express';
import validateSchema from '../middlewares/schemaValidationMiddleware.js';
import * as postSchemas from '../schemas/postSchemas.js';
import * as postController from '../controllers/postController.js';

const routes = new Router();

routes.post(
  '/',
  validateSchema(postSchemas.newPost),
  postController.create
);

export default routes;
