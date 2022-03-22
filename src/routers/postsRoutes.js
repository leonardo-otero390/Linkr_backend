import { Router } from 'express';
import validateSchemaMiddleware from '../middlewares/validateSchemaMiddleware.js';
import * as postSchemas from '../schemas/postSchemas.js';
import * as postController from '../controllers/postController.js';

const routes = new Router();

routes.post(
  '/',
  validateSchemaMiddleware(postSchemas.newPost),
  postController.create
);

export default routes;
