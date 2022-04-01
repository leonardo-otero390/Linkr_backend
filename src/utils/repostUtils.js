import * as postUtils from './postUtils.js';
import connection from '../database/connection.js';

export async function getReposts() {
  try {
    const posts = await connection.query(
      `SELECT
        p.id, p.link, p.text, p."authorId", p."linkTitle", p."linkDescription", p."linkImage",
        u.name, u."pictureUrl", s.id AS "sharedById", s.name AS "sharedByName"
      FROM posts p
        JOIN users u ON p."authorId"=u.id
        JOIN reposts r ON p.id=r."postId"
        JOIN users s ON r."userId"=s.id
      ORDER BY p.id DESC LIMIT 20;`
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

    return all;
  } catch (error) {
    return console.error(error);
  }
}
