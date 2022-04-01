import connection from '../database/connection.js';

async function insertUser({ email, passwordHash, name, pictureUrl }) {
  return connection.query(
    `INSERT INTO users (email, password, name, "pictureUrl") VALUES ($1, $2, $3, $4)`,
    [email, passwordHash, name, pictureUrl]
  );
}

async function getUserById(id) {
  return connection.query(`SELECT * FROM users WHERE id=$1`, [id]);
}

async function getUserByEmail(email) {
  return connection.query(`SELECT * FROM users WHERE email=$1`, [email]);
}

async function getUserByName(name) {
  const search = `${name}%`;
  return connection.query(`SELECT * FROM users WHERE name LIKE $1`, [search]);
}

async function find(id) {
  const result = await connection.query(`SELECT * FROM users WHERE id=$1`, [
    id,
  ]);

  if (!result.rowCount) return null;
  return result.rows[0];
}

const userRepository = {
  find,
  insertUser,
  getUserByEmail,
  getUserByName,
  getUserById,
};

export default userRepository;
