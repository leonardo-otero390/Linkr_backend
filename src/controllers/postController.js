import urlMetadata from 'url-metadata';
import * as postRepository from '../repositories/postRepository.js';
import * as hashtagRepository from '../repositories/hashtagRepository.js';
import * as hashtagPostRepository from '../repositories/hashtagPostRepository.js';
import userRepository from '../repositories/userRepository.js';

function extractHashtags(text) {
  const hashtags = text.match(/#\w+/g);
  return hashtags ? hashtags.map((hashtag) => hashtag.substring(1)) : [];
}
async function handleHashtags(text, postId) {
  const hashtags = extractHashtags(text);
  const hashtagsInDb = await hashtagRepository.findManyByName(hashtags) || [];
  let hashtagsNotInDb = hashtags;
  if (hashtagsInDb.length) {
    hashtagsNotInDb = hashtags.filter(
      (hashtag) => !hashtagsInDb.find((h) => h.name === hashtag)
    );
  }
  let newHashtagsIds = [];
  if (hashtagsNotInDb.length) {
    newHashtagsIds = await hashtagRepository.insertMany(hashtagsNotInDb);
  }
  newHashtagsIds.forEach((id) => hashtagsInDb.push(id));
  const hashtagsIds = hashtagsInDb.map((h) => h.id);
  await hashtagPostRepository.insertMany({ postId, hashtagsIds });
  return hashtagsIds;
}
export async function create(req, res) {
  const { userId } = res.locals;
  const { text, link } = req.body;

  try {
    const { title, description, image } = await urlMetadata(link);
    const post = await postRepository.insert({
      text,
      link,
      userId,
      title,
      description,
      image,
    });
    await handleHashtags(text, post.id);
    delete post.authorId;
    
    const user = await userRepository.find(userId);
    delete user.password;
    return res.status(201).send({ post, user, like: [] });
  } catch (error) {
    return res.sendStatus(500);
  }
}
