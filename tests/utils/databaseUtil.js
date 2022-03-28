import connection from '../../src/database/connection';

export const closeConnection = () => connection.end();

export async function clearDatabase() {
  try {
    await connection.query('DELETE FROM "hashtagsPosts"');
    await connection.query('DELETE FROM posts');
    await connection.query('DELETE FROM hashtags');
    await connection.query('DELETE FROM sessions');
    await connection.query('DELETE FROM users');
  } catch (error) {
    console.log(error);
  }
}
