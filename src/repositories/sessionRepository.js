import connection from '../database/connection.js';

async function deleteSession(token) {
  return connection.query(`DELETE FROM sessions WHERE token=$1`, [token]);
}

async function getSession(token) {
  return connection.query(`SELECT * FROM sessions WHERE token=$1`, [token]);
}

const sessionRepository = { deleteSession, getSession };

export default sessionRepository;
