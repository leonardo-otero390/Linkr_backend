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
  const result = await connection.query(
    `SELECT hashtags.name FROM "hashtags"
    JOIN "hashtagsPosts" ON "hashtags"."id" = "hashtagsPosts"."hashtagId"
    WHERE "hashtagsPosts"."postId" IN(${ids});`
  );
  if (!result.rowCount) return false;
  return result.rows;
}

export async function removeUnsedHashtags(postId, newHashtagsIds) {
  const notInValues = `(${newHashtagsIds.map((_, i) => `$${i+2}`).join(",")})`;

  const oldHashtagsIdsResult = await connection.query(`
    SELECT h.id FROM "hashtagsPosts" AS "hP"
    JOIN posts p ON p.id = "hP"."postId"
    JOIN hashtags h ON h.id = "hP"."hashtagId"
    WHERE "hP"."postId" = $1 AND "hP"."hashtagId" NOT IN ${notInValues}
  `, [postId, ...newHashtagsIds]);

  if (oldHashtagsIdsResult.rowCount === 0) return;

  const oldHashtagsIds = oldHashtagsIdsResult.rows.map(({id}) => id);
  const inValues = `(${oldHashtagsIds.map((_, i) => `$${i+2}`).join(",")})`;
  
  let oldHashtagsDeletionResult = await connection.query(`
    DELETE FROM "hashtagsPosts" AS "hP"
    WHERE "hP"."postId" = $1 AND "hP"."hashtagId" IN ${inValues}
  `, [postId, ...oldHashtagsIds]);
  console.log(oldHashtagsDeletionResult, "here")
  oldHashtagsDeletionResult = await connection.query(`
    DELETE FROM hashtags AS h
    WHERE h.id IN ${inValues}
  `, [postId, ...oldHashtagsIds]);
  console.log(oldHashtagsDeletionResult)

  /* if (!result.rowCount) return false;
  return result.rows; */
}
