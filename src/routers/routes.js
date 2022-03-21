import { Router } from 'express';

const routes = new Router();

routes.get('/health', async (req, res) => {
  res.sendStatus(200);
});

export default routes;
