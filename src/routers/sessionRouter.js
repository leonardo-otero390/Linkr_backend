import { Router } from 'express';

import { finishSession } from '../controllers/sessionController.js';
import validateAuth from '../middlewares/authValidationMiddleware.js';

const sessionRouter = Router();

sessionRouter.delete('/sessions', validateAuth, finishSession);

export default sessionRouter;
