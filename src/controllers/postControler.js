import connection from '../database/connection.js';

export async function GetPosts(req, res) {
  try {
    const posts = await connection.query(
      'SELECT p.id, p.link, p.text, p."authorId",p."linkTitle",p."linkDescription",p."linkImage", u.name, u."pictureUrl" FROM posts p JOIN users u ON p."authorId"=u.id ORDER BY p.id DESC LIMIT 20;'
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
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getPostsId(req, res) {
  try {
    const userId = req.params.id;

    const valideIds = await connection.query(
      'SELECT id FROM users WHERE id=$1',
      [userId]
    );
    if (valideIds.rowCount === 0) return res.sendStatus(404);

    const posts = await connection.query(
      'SELECT p.id, p.link, p.text, p."authorId",p."linkTitle",p."linkDescription",p."linkImage", u.name, u."pictureUrl" FROM posts p JOIN users u ON p."authorId"=u.id WHERE p."authorId"=$1 ORDER BY p.id DESC LIMIT 20;',
      [userId]
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
  } catch (err) {
    res.status(500).send(err.message);
  }
}
