import { Router } from 'express';
import { createUser } from '../controllers/userController.js';
import validateSchema from '../middlewares/schemaValidationMiddleware.js';
import userSchema from '../schemas/userSchema.js';

const userRouter = Router();

userRouter.post('/users', validateSchema(userSchema), createUser);

export default userRouter;
