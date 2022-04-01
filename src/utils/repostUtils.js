import * as postUtils from './postUtils.js';
import * as repostRepository from '../repositories/repostRepository.js';

export async function getReposts(followedIds) {
  if (followedIds === null || followedIds.length === 0) {
    return null;
  }

  try {
    let reposts = await repostRepository.findManyByUserIds(followedIds);
    reposts = await postUtils.addPostActionsInfo(reposts);

    if(reposts.length === 0) {
      return null;
    }

    return reposts;
  } catch (error) {
    return console.error(error);
  }
}
