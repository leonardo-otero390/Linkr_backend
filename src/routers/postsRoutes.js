import { Router } from 'express';
import validateSchema from '../middlewares/schemaValidationMiddleware.js';
import * as postSchemas from '../schemas/postSchemas.js';
import * as postController from '../controllers/postController.js';
import validateToken from '../middlewares/tokenValidator.js';

const routes = new Router();

routes.post(
  '/',
  validateToken,
  validateSchema(postSchemas.newPost),
  postController.create
);

export default routes;
