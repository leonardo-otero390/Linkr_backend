import sqlString from 'sqlstring';
import connection from '../database/connection.js';

export async function listTopHashtags(limit) {
  const result = await connection.query(
    `
  SELECT COUNT("postId"),name,hashtags.id FROM "hashtagsPosts"
  JOIN hashtags ON hashtags.id="hashtagId"
  GROUP BY name,hashtags.id
  ORDER BY count DESC
    LIMIT $1;`,
    [limit]
  );
  if (!result.rowCount) return null;
  return result.rows;
}

export async function findManyByName(names) {
  if (names === null || names.length === 0) {
    return [];
  }

  const query = sqlString.escape(names);
  const result = await connection.query(
    `SELECT * FROM hashtags WHERE name IN (${query});`
  );
  if (!result.rowCount) return false;
  return result.rows;
}

export async function insertMany(names) {
  if (names === null || names.length === 0) {
    return [];
  }

  const stringNames = sqlString.escape(names);
  const query = stringNames.replace(/, /g, '),(');
  const result = await connection.query(
    `INSERT INTO hashtags (name) VALUES (${query})
    RETURNING id;`
  );
  if (!result.rowCount) return false;
  return result.rows;
}

export async function removeById(hashtagsId) {
  await connection.query(`
    DELETE FROM hashtags AS h
    WHERE h.id = $1
  `, [hashtagsId]);
 }
