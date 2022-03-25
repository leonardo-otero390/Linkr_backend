import connection from '../database/connection.js';

async function find(token) {
  const result = await connection.query(
    'SELECT * FROM sessions WHERE token=$1;',
    [token]
  );
  if (!result.rowCount) return false;
  return result.rows[0];
}

async function deleteSession(token) {
  return connection.query(`DELETE FROM sessions WHERE token=$1`, [token]);
}

async function getSession(token) {
  return connection.query(`SELECT * FROM sessions WHERE token=$1`, [token]);
}

async function createSession(sessionData) {
  return connection.query(`
    INSERT INTO sessions 
    ("userId", token) VALUES ($1, $2)
  `, [sessionData.userId, sessionData.token]);
}

const sessionRepository = { find, deleteSession, getSession, createSession };

export default sessionRepository;
