import sessionRepository from '../repositories/sessionRepository.js';

export async function finishSession(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  try {
    await sessionRepository.deleteSession(token);

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send('There was an internal server error');
  }
}
