import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import userRepository from '../repositories/userRepository.js';

export async function createUser(req, res) {
  const newUser = req.body;

  newUser.passwordHash = bcrypt.hashSync(newUser.password, 10);
  delete newUser.password;

  try {
    const userWithSameEmailResult = await userRepository.getUserByEmail(
      newUser.email
    );

    if (userWithSameEmailResult.rowCount > 0) {
      res.status(409).send('The inserted email is already in use');
      return;
    }

    await userRepository.insertUser(newUser);

    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.status(500).send('There was an internal server error');
  }
}

export async function authenticateUser(req, res) {
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

    await userRepository.createSession(sessionData);

    const auth = {
      userName: user.name,
      userPicture: user.pictureUrl,
      token: sessionData.token,
    };

    return res.status(200).send(auth);
  } catch (error) {
    console.log(error);
    return res.status(500).send('There was an internal server error');
  }
}
