import connection from '../database/connection.js';

export async function findManyByUserIds(ids) {
  if (ids === null || ids.length === 0) {
    return [];
  }

  const result = await connection.query(
    `SELECT
      p.id, p.link, p.text, p."authorId", p."linkTitle", p."linkDescription", p."linkImage",
      u.name, u."pictureUrl", s.id AS "sharedById", s.name AS "sharedByName"
    FROM posts p
      JOIN users u ON p."authorId"=u.id
      JOIN reposts r ON p.id=r."postId"
      JOIN users s ON r."userId"=s.id
    WHERE s.id IN (${ids})
    ORDER BY p.id DESC;`
  );

  return result.rows;
}

export async function findManyByUserId(id) {
  return findManyByUserIds([id]);
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
