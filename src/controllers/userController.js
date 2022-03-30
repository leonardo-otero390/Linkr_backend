import bcrypt from 'bcrypt';

import userRepository from '../repositories/userRepository.js';
import followerRepository from '../repositories/followerRepository.js';

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

export async function getUserByName(req, res) {
  try {
    const { name } = req.query;

    const users = await userRepository.getUserByName(name);

    res.send(users.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function unfollow(req, res) {
  const followerId = res.locals.userId;
  const followedId = Number(req.params.id);

  if (Number.isNaN(followedId))
    return res.status(400).send('The followed id must be a number');

  if (followerId === followedId)
    return res.status(400).send('You cannot unfollow yourself');

  try {
    const followedUser = await userRepository.find(followedId);
    if (!followedUser) return res.status(404).send('The user does not exist');
    const followedFollowers = await followerRepository.getFollowers(followedId);
    if (
      followedFollowers.some((follower) => follower.followerId === followerId)
    )
      return res.status(404).send('You are not following this user');
    await followerRepository.removeFollow({ followerId, followedId });
    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function follow(req, res) {
  const followerId = res.locals.userId;
  const followedId = Number(req.params.id);

  if (Number.isNaN(followedId))
    return res.status(400).send('The followed id must be a number');

  if (followerId === followedId)
    return res.status(400).send('You cannot follow yourself');

  try {
    const followedUser = await userRepository.find(followedId);
    if (!followedUser) return res.status(404).send('The user does not exist');
    const followedFollowers = await followerRepository.getFollowers(followedId);
    if (
      followedFollowers.some((follower) => follower.followerId === followerId)
    )
      return res.status(409).send('You are already following this user');
    await followerRepository.insertFollower({ followerId, followedId });
    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
