import { Router } from 'express';

import {
  createUser,
  getUserByName,
  toggleFollow,
  getFollows,
  getUserById,
} from '../controllers/userController.js';

import validateSchema from '../middlewares/schemaValidationMiddleware.js';
import validateAuth from '../middlewares/authValidationMiddleware.js';
import userSchema from '../schemas/userSchema.js';

const userRouter = Router();
userRouter.get('/users/:id', validateAuth, getUserById);
userRouter.post('/users', validateSchema(userSchema), createUser);
userRouter.get('/users/follows', validateAuth, getFollows);
userRouter.put('/users/:id/follow', validateAuth, toggleFollow);
userRouter.get('/users', validateAuth, getUserByName);

export default userRouter;
