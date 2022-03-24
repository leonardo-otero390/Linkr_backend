import connection from '../database/connection.js';

export async function insert({ text, link, userId,title,description,image }) {
  const result = await connection.query(
    `
    INSERT INTO posts (text,link,authorId,time,"linkTitle","linkDescription","linkImage")
    VALUES ($1,$2,$3,NOW())
    RETURNING id
    ;
    `,
    [text, link, userId,title,description,image]
  );
  if (!result.rowCount) return false;
  return result.rows[0];
}
