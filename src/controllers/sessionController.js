import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import sessionRepository from '../repositories/sessionRepository.js';
import userRepository from '../repositories/userRepository.js';

export async function finishSession(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  try {
    await sessionRepository.deleteSession(token);

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send('There was an internal server error');
  }
}

export async function createSession(req, res) {
  const { email, password } = req.body;

  try {
    const existingUserResult = await userRepository.getUserByEmail(email);

    if (existingUserResult.rowCount === 0) {
      return res.status(401).send('The email or password entered is incorrect');
    }

    const [user] = existingUserResult.rows;
    const matchesHashedPassword = bcrypt.compareSync(password, user.password);

    if (!matchesHashedPassword) {
      return res.status(401).send('The email or password entered is incorrect');
    }

    const sessionData = {
      userId: user.id,
      token: uuid(),
    };

    await sessionRepository.createSession(sessionData);

    const auth = {
      userName: user.name,
      userPicture: user.pictureUrl,
      token: sessionData.token,
    };

    res.status(200).send(auth);
  } catch (error) {
    res.status(500).send('There was an internal server error');
  }
  return 2;
}
