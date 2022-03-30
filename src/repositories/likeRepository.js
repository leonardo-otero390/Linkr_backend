import connection from '../database/connection.js';

export async function findByPostIds(ids) {
  const result = await connection.query(
    `SELECT
      "postId", "userId", name as "userName"
    FROM likes JOIN users ON likes."userId"=users.id
    WHERE "postId" IN (${ids});`
  );
  
  return result.rows;
}

export async function toggle(userId, postId) {
  const isLikedResult = await connection.query(
    `SELECT * FROM likes WHERE "userId"=$1 AND "postId"=$2`,
    [userId, postId]
  );

  const isLiked = isLikedResult.rowCount > 0;
  
  if(isLiked) {
    await connection.query(
      `DELETE FROM likes WHERE "userId"=$1 AND "postId"=$2`,
      [userId, postId]
    ); 
  } else {
    await connection.query(
      `INSERT INTO likes ("userId", "postId") VALUES ($1, $2)`,
      [userId, postId]
    );
  }
}
