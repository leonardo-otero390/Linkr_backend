import urlMetadata from 'url-metadata';
import * as postRepository from '../repositories/postRepository.js';
import * as hashtagRepository from '../repositories/hashtagRepository.js';
import * as hashtagPostRepository from '../repositories/hashtagPostRepository.js';

function extractHashtags(text) {
  const hashtags = text.match(/#\w+/g);
  return hashtags ? hashtags.map((hashtag) => hashtag.substring(1)) : [];
}
async function handleHashtags(text, postId) {
  const hashtags = extractHashtags(text);
  const hashtagsInDb = await hashtagRepository.findManyByName(hashtags);
  const hashtagsNotInDb = hashtags.filter(
    (hashtag) => !hashtagsInDb.find((h) => h.name === hashtag)
  );
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
  const { user } = res.locals;
  const { text, link } = req.body;

  try {
    const { title, description, image } = await urlMetadata(link);
    const post = await postRepository.insert({
      text,
      link,
      userId: user.id,
      title,
      description,
      image,
    });
    delete post.authorId;
    await handleHashtags(text, post.id);
    return res.status(201).send({ post, user, like: [] });
  } catch (error) {
    console.error(error.message);
    return res.sendStatus(500);
  }
}
