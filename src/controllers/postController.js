import urlMetadata from 'url-metadata';
import * as postRepository from '../repositories/postRepository.js';
import * as hashtagRepository from '../repositories/hashtagRepository.js';
import * as hashtagPostRepository from '../repositories/hashtagPostRepository.js';
import * as likeRepository from '../repositories/likeRepository.js';
import * as repostRepository from '../repositories/repostRepository.js';
import userRepository from '../repositories/userRepository.js';
import * as postUtils from '../utils/postUtils.js';
import * as repostUtils from '../utils/repostUtils.js';
import connection from '../database/connection.js';

function extractHashtags(text) {
  const hashtags = text.match(/#\w+/g);
  return hashtags ? hashtags.map((hashtag) => hashtag.substring(1)) : [];
}

async function handleHashtags(text, postId) {
  const hashtags = extractHashtags(text);
  if (!hashtags.length) return 0;

  const hashtagsInDb = (await hashtagRepository.findManyByName(hashtags)) || [];
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
  const existHashtag = text.includes('#');

  try {
    const { title, description, image } = await urlMetadata(link);

    const post = await postRepository.insert({
      text,
      link,
      userId,
      title: title || "Link doesn't have a title",
      description: description || "Link doesn't have a description",
      image: image || 'https://http.cat/404',
    });

    if (existHashtag) await handleHashtags(text, post.id);

    delete post.authorId;

    const user = await userRepository.find(userId);
    delete user.password;
    return res.status(201).send({ post, user, like: [] });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function remove(req, res) {
  try {
    const { id } = req.params;

    const { userId } = res.locals;

    const postToDelete = await postRepository.get(id);

    if (!postToDelete) {
      return res.status(422).send('There is no post with this id');
    }

    if (postToDelete.authorId !== userId) {
      return res.status(401).send('This post is not yours');
    }

    await postRepository.remove(id);

    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function getPosts(req, res) {
  try {
    const posts = await connection.query(
      'SELECT p.id, p.link, p.text, p."authorId",p."linkTitle",p."linkDescription",p."linkImage", u.name, u."pictureUrl" FROM posts p JOIN users u ON p."authorId"=u.id ORDER BY p.id DESC LIMIT 20;'
    );

    const hashtagsPosts = await connection.query(
      'SELECT hp.*, h.name FROM "hashtagsPosts" hp JOIN hashtags h ON hp."hashtagId"=h.id'
    );

    let all = posts.rows.map((p) => {
      const array = {
        ...p,
        hashtags: hashtagsPosts.rows.filter((h) => p.id === h.postId),
      };

      array.hashtags = array.hashtags.map((h) => h.name);

      return array;
    });

    all = await postUtils.addPostActionsInfo(all);

    res.send(all);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
}

export async function getPostsById(req, res) {
  try {
    const userId = req.params.id;

    const valideIds = await connection.query(
      'SELECT id FROM users WHERE id=$1',
      [userId]
    );
    if (valideIds.rowCount === 0) return res.sendStatus(404);

    const posts = await connection.query(
      'SELECT p.id, p.link, p.text, p."authorId",p."linkTitle",p."linkDescription",p."linkImage", u.name, u."pictureUrl" FROM posts p JOIN users u ON p."authorId"=u.id WHERE p."authorId"=$1 ORDER BY p.id DESC LIMIT 20;',
      [userId]
    );

    const hashtagsPosts = await connection.query(
      'SELECT hp.*, h.name FROM "hashtagsPosts" hp JOIN hashtags h ON hp."hashtagId"=h.id'
    );

    let all = posts.rows.map((p) => {
      const array = {
        ...p,
        hashtags: hashtagsPosts.rows.filter((h) => p.id === h.postId),
      };

      array.hashtags = array.hashtags.map((h) => h.name);

      return array;
    });

    all = await postUtils.addPostActionsInfo(all);

    return res.send(all);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function toggleLikePost(req, res) {
  const { id } = req.params;

  const { userId } = res.locals;

  try {
    const post = await postRepository.get(id);

    if (!post) {
      return res.status(422).send("This post doesn't exist");
    }

    await likeRepository.toggle(userId, id);

    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}

export async function repost(req, res) {
  const { id } = req.params;

  const { userId } = res.locals;

  try {
    const post = await postRepository.get(id);

    if (!post) {
      return res.status(422).send("This post doesn't exist");
    }

    await repostRepository.insert(userId, id);

    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}
