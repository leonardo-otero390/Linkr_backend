import { Router } from 'express';

import {
  createUser,


getUserByName,
getUserById,
} from '../controllers/userController.js';

import validateSchema from '../middlewares/schemaValidationMiddleware.js';
import validateAuth from '../middlewares/authValidationMiddleware.js';

import userSchema from '../schemas/userSchema.js';

const userRouter = Router();

userRouter.get('/users/:id', validateAuth, getUserById);
userRouter.post('/users', validateSchema(userSchema), createUser);

userRouter.post('/users/name', validateAuth, getUserByName);

userRouter.get('/users', validateAuth, getUserByName);

export default userRouter;
