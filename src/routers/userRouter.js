import { Router } from 'express';

import { createUser, authenticateUser } from '../controllers/userController.js';
import validateSchema from '../middlewares/schemaValidationMiddleware.js';
import loginSchema from '../schemas/loginSchema.js';
import userSchema from '../schemas/userSchema.js';

const userRouter = Router();

userRouter.post('/users', validateSchema(userSchema), createUser);
userRouter.post('/users/authentication', validateSchema(loginSchema), authenticateUser);

export default userRouter;
