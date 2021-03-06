import * as hashtagRepository from '../repositories/hashtagRepository.js';
import * as hashtagPostRepository from '../repositories/hashtagPostRepository.js';
import * as postUtils from '../utils/postUtils.js';

async function insertHashtagsInPostArray(posts) {
  const postsIds = posts.map((post) => post.id);
  const hashtags = await hashtagPostRepository.findHashtagsNamesByPostsIds(
    postsIds
  );
  if (!hashtags) return posts;
  return posts.map((post) => {
    const thisPosthashtags = hashtags.filter(
      (hashtag) => hashtag.postId === post.id
    );

    return { ...post, hashtags: thisPosthashtags };
  });
}

async function organizePostObjects(posts) {
  let arr = await posts.map((post) => {
    const object = {
      id: post.postId,
      text: post.text,
      link: post.link,
      linkTitle: post.linkTitle,
      linkDescription: post.linkDescription,
      linkImage: post.linkImage,
      authorId: post.authorId,
      name: post.name,
      pictureUrl: post.pictureUrl,
      likes: [],
      hashtags: [],
    };
    return object;
  });

  // Most recent posts must appear earlier
  arr.sort((a, b) => b.id - a.id);
  
  arr = await postUtils.addPostActionsInfo(arr);
  arr = await insertHashtagsInPostArray(arr);
  return arr;
}

export async function getTrending(req, res) {
  try {
    const trendingHashtags = await hashtagRepository.listTopHashtags(10);
    if (!trendingHashtags) return res.status(200).send([]);
    return res.status(200).send(trendingHashtags);
  } catch (error) {
    return res.status(500).send(error.message);
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
    console.error(error);
    return res.status(500).send(error.message);
  }
}
