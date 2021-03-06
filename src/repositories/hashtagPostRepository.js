import connection from '../database/connection.js';

export async function insertMany({ postId, hashtagsIds }) {
  const arr = hashtagsIds.map((id) => [postId, id]);
  const query = arr.join('),(');
  const result = await connection.query(
    `INSERT INTO "hashtagsPosts" ("postId","hashtagId") VALUES (${query});`
  );
  if (!result.rowCount) return false;
  return true;
}

export async function findPostsByHashtag(name) {
  const result = await connection.query(
    `SELECT *,users.name as username FROM "posts"
    JOIN "hashtagsPosts" ON "posts"."id" = "hashtagsPosts"."postId"
    JOIN "hashtags" ON "hashtags"."id" = "hashtagsPosts"."hashtagId"
    JOIN users ON users.id = posts."authorId"
    WHERE "hashtags"."name" = $1;`,
    [name]
  );
  if (!result.rowCount) return false;
  return result.rows;
}

export async function findHashtagsNamesByPostsIds(ids) {
  if (ids === null || ids.length === 0) {
    return [];
  }

  const result = await connection.query(
    `SELECT hashtags.name FROM "hashtags"
    JOIN "hashtagsPosts" ON "hashtags"."id" = "hashtagsPosts"."hashtagId"
    WHERE "hashtagsPosts"."postId" IN(${ids});`
  );
  if (!result.rowCount) return false;
  return result.rows;
}
