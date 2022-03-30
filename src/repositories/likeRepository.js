import connection from '../database/connection.js';

export async function findManyPostsIds(ids) {
  const result = await connection.query(
    `SELECT * FROM likes WHERE "postId" IN (${ids});`
  );
  if (!result.rowCount) return false;
  return result.rows;
}
