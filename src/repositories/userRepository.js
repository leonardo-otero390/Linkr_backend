import connection from '../database/connection.js';

async function insertUser({ email, passwordHash, name, pictureUrl }) {
  return connection.query(
    `INSERT INTO users (email, password, name, "pictureUrl") VALUES ($1, $2, $3, $4)`,
    [email, passwordHash, name, pictureUrl]
  );
}

async function getUserByEmail(email) {
  return connection.query(`SELECT * FROM users WHERE email=$1`, [email]);
}

async function getUserByName(name) {
  return connection.query(`SELECT * FROM users WHERE name LIKE $1`, [
    name + '%',
  ]);
}

const userRepository = { insertUser, getUserByEmail, getUserByName };

export default userRepository;
