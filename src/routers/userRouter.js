import { Router } from 'express';

import {
  createUser,
  getUserByName,
  follow,
  unfollow,
} from '../controllers/userController.js';
import validateSchema from '../middlewares/schemaValidationMiddleware.js';
import userSchema from '../schemas/userSchema.js';
import validateAuth from '../middlewares/authValidationMiddleware.js';

const userRouter = Router();

userRouter.post('/users', validateSchema(userSchema), createUser);
userRouter.get('/users', getUserByName);
userRouter.post('/users/:id/follow', validateAuth, follow);
userRouter.delete('/users/:id/follow', validateAuth, unfollow);

export default userRouter;
