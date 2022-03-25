import { Router } from 'express';

import { createSession, finishSession } from '../controllers/sessionController.js';
import validateAuth from '../middlewares/authValidationMiddleware.js';
import validateSchema from '../middlewares/schemaValidationMiddleware.js';
import loginSchema from '../schemas/loginSchema.js';

const sessionRouter = Router();


sessionRouter.post('/sessions', validateSchema(loginSchema), createSession);
sessionRouter.delete('/sessions', validateAuth, finishSession);

export default sessionRouter;
