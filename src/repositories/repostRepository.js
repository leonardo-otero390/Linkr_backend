import connection from '../database/connection.js';

export async function findByUserIds(ids) {
  if (ids === null || ids.length === 0) {
    return [];
  }

  const result = await connection.query(
    `SELECT
      "postId", "userId", name as "userName"
    FROM reposts JOIN users ON reposts."userId"=users.id
    WHERE "userId" IN (${ids});`
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
