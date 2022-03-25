import connection from '../database/connection.js';

export async function listTopHashtags(limit) {
  const result = await connection.query(
    `
  SELECT COUNT("postId"),name,hashtags.id FROM "hashtagsPosts"
  JOIN hashtags ON hashtags.id="hashtagId"
  GROUP BY name,hashtags.id
  ORDER BY count DESC
    LIMIT $1;`,
    [limit]
  );
  if (!result.rowCount) return null;
  return result.rows;
}
