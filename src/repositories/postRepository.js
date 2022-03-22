import connection from '../database/connection.js';

export async function insert({ text, link, userId }) {
  const result = await connection.query(
    `
    INSERT INTO posts (text,link,authorId,time)
    VALUES ($1,$2,$3,NOW());
    `,
    [text, link, userId]
  );
  if (!result.rowCount) return false;
  return true;
}
