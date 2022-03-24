import connection from '../database/connection.js';

export async function GetPosts(req, res) {
  try {
    const posts = await connection.query(
      'SELECT p.id, p.link, p.text, p."authorId", u.name, u."pictureUrl" FROM posts p JOIN users u ON p."authorId"=u.id ORDER BY p.id DESC LIMIT 20;'
    );

    const hashtagsPosts = await connection.query(
      'SELECT hp.*, h.name FROM "hashtagsPosts" hp JOIN hashtags h ON hp."hashtagId"=h.id'
    );

    const all = posts.rows.map((p) => {
      const array = {
        ...p,
        hashtags: hashtagsPosts.rows.filter((h) => p.id === h.postId),
      };

      array.hashtags = array.hashtags.map((h) => h.name);

      return array;
    });

    res.send(all);
    //res.sendStatus(404);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
