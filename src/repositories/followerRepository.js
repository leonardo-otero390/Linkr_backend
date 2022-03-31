import connection from '../database/connection.js';

async function getFollows(followerId) {
  const result = await connection.query(
    `
    SELECT * FROM followers
    WHERE "followerId" = $1
  `,
    [followerId]
  );
  if (!result.rowCount) return null;
  return result.rows;
}

const followerRepository = { getFollows };

export default followerRepository;
