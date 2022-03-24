import sessionRepository from '../repositories/sessionRepository.js';

export default async function validateAuth(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send('Você não está autorizado!');
  }

  try {
    const sessionResult = await sessionRepository.getSession(token);
    const [session] = sessionResult.rows;

    if (!session) {
      return res.status(401).send('Você não está autorizado!');
    }

    res.locals.userId = session.userId;

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).send('There was an internal server error');
  }
}
