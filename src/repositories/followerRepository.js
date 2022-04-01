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

async function removeFollow({ followerId, followedId }) {
  const result = await connection.query(
    `
  DELETE FROM followers
  WHERE "followerId" = $1 AND "followedId" = $2
  RETURNING *
`,
    [followerId, followedId]
  );
  if (!result.rowCount) return false;
  return result.rows[0];
}

async function getFollows(followerId) {
  const result = await connection.query(
    `
  SELECT * FROM followers
  WHERE "followerId" = $1
`,
    [followerId]
  );
  if (!result.rowCount) return [];
  return result.rows;
}

const followerRepository = { insertFollower, getFollows,removeFollow };

export default followerRepository;
