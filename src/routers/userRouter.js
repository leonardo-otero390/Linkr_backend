import { Router } from 'express';

import {
  createUser,
  getUserByName,
  toggleFollow,
} from '../controllers/userController.js';
import validateSchema from '../middlewares/schemaValidationMiddleware.js';
import userSchema from '../schemas/userSchema.js';
import validateAuth from '../middlewares/authValidationMiddleware.js';

const userRouter = Router();

userRouter.post('/users', validateSchema(userSchema), createUser);
userRouter.get('/users', getUserByName);
userRouter.put('/users/:id/follow', validateAuth, toggleFollow);

export default userRouter;
