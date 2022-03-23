import { Router } from 'express';

import { finishSession } from '../controllers/sessionController.js';
import validateAuth from '../middlewares/authValidationMiddleware.js';

const sessionRouter = Router();

sessionRouter.post('/auth/logout', validateAuth, finishSession);

export default sessionRouter;
