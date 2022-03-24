import connection from '../database/connection.js';

export async function find(token) {
  const result = await connection.query(
    'SELECT * FROM sessions WHERE token=$1;',
    [token]
  );
  if (!result.rowCount) return false;
  return result.rows[0];
}
