import connection from '../database/connection.js';

export async function findManyByUserIds(followedIds) {
  if (followedIds === null || followedIds.length === 0) {
    return null;
  }

  const result = await connection.query(
    `SELECT
      p.id, p.link, p.text, p."authorId", p."linkTitle", p."linkDescription", p."linkImage",
      u.name, u."pictureUrl", s.id AS "sharedById", s.name AS "sharedByName"
    FROM posts p
      JOIN users u ON p."authorId"=u.id
      JOIN reposts r ON p.id=r."postId"
      JOIN users s ON r."userId"=s.id
    WHERE s.id IN (${followedIds})
    ORDER BY p.id DESC LIMIT 20;`
  );

  return result.rows;
}

export async function countByPostIds(ids) {
  if (ids === null || ids.length === 0) {
    return [];
  }

  const result = await connection.query(
    `SELECT
      "postId", COUNT("postId")
    FROM reposts
    WHERE "postId" IN (${ids})
    GROUP BY "postId";`
  );

  return result.rows;
}

export async function insert(userId, postId) {
  await connection.query(
    `INSERT INTO reposts ("userId", "postId") VALUES ($1, $2)`,
    [userId, postId]
  );
}
