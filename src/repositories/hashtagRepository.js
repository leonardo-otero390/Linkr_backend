import sqlString from 'sqlstring';
import connection from '../database/connection.js';

export async function findManyByName(names) {
  const query = sqlString.escape(names);
  const result = await connection.query(
    `SELECT * FROM hashtags WHERE name IN (${query});`
  );
  if (!result.rowCount) return false;
  return result.rows;
}

export async function insertMany(names) {
  const stringNames = sqlString.escape(names);
  const query = stringNames.replace(/, /g, '),(');
  const result = await connection.query(
    `INSERT INTO hashtags (name) VALUES (${query})
    RETURNING id;`
  );
  if (!result.rowCount) return false;
  return result.rows;
}
