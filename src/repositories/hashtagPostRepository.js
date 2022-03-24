import connection from '../database/connection.js';


export async function insertMany({postId, hashtagsIds}) {
const arr = hashtagsIds.map(id => ({postId, hashtagId: id}));
const query = arr.join('),(');
  const result = await connection.query(
    `INSERT INTO "hashtagsPosts" ("postId","hashtagId") VALUES (${query});`
  );
  if (!result.rowCount) return false;
  return true;
}
