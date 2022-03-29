import connection from '../database/connection.js';

export async function findManyPostsIds(ids) {
  const result = await connection.query(
    `SELECT * FROM likes WHERE "postId" IN (${ids});`
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
