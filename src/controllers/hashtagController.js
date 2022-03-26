import * as hashtagRepository from '../repositories/hashtagRepository.js';
import * as hashtagPostRepository from '../repositories/hashtagPostRepository.js';
import * as likeRepository from '../repositories/likeRepository.js';

async function insertLikesInPostArray(posts) {
  const postsIds = posts.map((post) => post.id);
  const likes = await likeRepository.findManyPostsIds(postsIds);
  if(!likes) return posts;
  return posts.map((post) => {
    const thisPostlikes = likes.filter((like) => like.postId === post.id);

    return { ...post, likes: thisPostlikes };
  });
}

async function organizePostObjects(posts) {
  const arr = posts.map((post) => {
    const object = {
      id: post.postId,
      text: post.text,
      link: post.link,
      linkTitle: post.linkTitle,
      linkDescription: post.linkDescription,
      linkImage: post.linkImage,
      user: {
        id: post.authorId,
        username: post.username,
        avatar: post.pictureUrl,
      },
      likes: [],
    };
    return object;
  });
  return insertLikesInPostArray(arr);
}

export async function getTrending(req, res) {
  try {
    const trendingHashtags = await hashtagRepository.listTopHashtags(10);
    if (!trendingHashtags) return res.status(204).send('No hashtags found');
    return res.status(200).send(trendingHashtags);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function getPostsByHashtag(req, res) {
  const { name } = req.params;
  try {
    const posts = await hashtagPostRepository.findPostsByHashtag(name);
    if (!posts) return res.status(204).send('No posts found');
    const result = await organizePostObjects(posts);
    return res.status(200).send(result);
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(500);
  }
}
