import * as likeRepository from '../repositories/likeRepository.js';
import * as repostRepository from '../repositories/repostRepository.js';

async function insertLikesInPostArray(posts) {
  const postsIds = posts.map((post) => post.id);
  const likes = await likeRepository.findByPostIds(postsIds);
  if(!likes) return posts.map(p => ({...p, likes: []}));
  return posts.map((post) => {
    const thisPostLikes = likes.filter((like) => like.postId === post.id);

    return { ...post, likes: thisPostLikes };
  });
}

async function insertRepostCountInPostArray(posts) {
  const postsIds = posts.map((post) => post.id);
  const repostCounts = await repostRepository.countByPostIds(postsIds);
  if(!repostCounts) return posts;
  return posts.map((post) => {
    const thisPostRepostCount = repostCounts.find((r) => r.postId === post.id);

    return { 
      ...post,
      repostCount: thisPostRepostCount || {
        postId: post.id,
        count: 0,
      },
    };
  });
}

export async function addPostActionsInfo(posts) {
  let postsWithInfo = await insertLikesInPostArray(posts);
  postsWithInfo = await insertRepostCountInPostArray(postsWithInfo);
  
  return postsWithInfo;
}