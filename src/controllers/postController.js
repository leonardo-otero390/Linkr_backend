import * as postRepository from '../repositories/postRepository.js';

export async function create(req, res) {
  const { id: userId } = res.locals.user;
  const { text, link } = req.body;
  try {
    const result = await postRepository.insert({ text, link, userId });
    if (!result) throw new Error();
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
}
