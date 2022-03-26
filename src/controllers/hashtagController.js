import * as hashtagRepository from '../repositories/hashtagRepository.js';

export async function getTrending(req, res) {
  try {
    const trendingHashtags = await hashtagRepository.listTopHashtags(10);
    if (!trendingHashtags) return res.status(200).send([]);
    return res.status(200).send(trendingHashtags);
  } catch (error) {
    return res.sendStatus(500);
  }
}
