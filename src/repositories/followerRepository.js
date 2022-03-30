import connection from '../database/connection.js';

async function insertFollower({ followerId, followedId }) {
  const result = await connection.query(
    `
  INSERT INTO followers ("followerId", "followedId")
  VALUES ($1, $2)
  RETURNING *
`,
    [followerId, followedId]
  );
  if (!result.rowCount) return false;
  return result.rows[0];
}

async function getFollowers(followedId) {
  const result = await connection.query(
    `
  SELECT * FROM followers
  WHERE "followedId" = $1
`,
    [followedId]
  );
  if (!result.rowCount) return [];
  return result.rows;
}

const followerRepository = { insertFollower, getFollowers };

export default followerRepository;
