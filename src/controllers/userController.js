import bcrypt from 'bcrypt';

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
    res.status(500).send('There was an internal server error');
  }
}