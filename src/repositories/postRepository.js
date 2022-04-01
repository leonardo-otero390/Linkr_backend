import connection from '../database/connection.js';

export async function insert({
  text,
  link,
  userId,
  title,
  description,
  image,
}) {
  const result = await connection.query(
    `
    INSERT INTO posts (text,link,"authorId",time,"linkTitle","linkDescription","linkImage")
    VALUES ($1,$2,$3,NOW(),$4,$5,$6)
    RETURNING *;
    ;
    `,
    [text, link, userId, title, description, image]
  );
  if (!result.rowCount) return false;
  return result.rows[0];
}

export async function remove(id) {
  // Deleting post dependents
  await connection.query(`DELETE FROM likes WHERE "postId"=$1`, [id]);
  await connection.query(`DELETE FROM "hashtagsPosts" WHERE "postId"=$1`, [id]);
  await connection.query(`DELETE FROM comments WHERE "postId"=$1`, [id]);
  await connection.query(`DELETE FROM reposts WHERE "postId"=$1`, [id]);
  
  await connection.query(`DELETE FROM posts WHERE id=$1`, [id]);
}

export async function get(id) {
  const result = await connection.query(`SELECT * FROM posts WHERE id=$1`, [
    id,
  ]);

  if (result.rowCount === 0) return null;
  return result.rows[0];
}

export async function findManyByUserId(userId) {
  const result = await connection.query(`
  SELECT p.id, p.link, p.text, p."authorId",p."linkTitle",
  p."linkDescription",p."linkImage", u.name, u."pictureUrl"
  FROM posts p
  JOIN users u ON p."authorId"=u.id
  WHERE p."authorId"=$1 
  ORDER BY p.id DESC 
  LIMIT 20;
  `, [userId]);
  
  return result.rows;
}
