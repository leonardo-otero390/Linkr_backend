import * as postRepository from '../repositories/postRepository.js';
import connection from '../database/connection.js';

export default async function validateQuerys(req, res, next) {
  try {
    const userId = req.params.id;
    const { limit } = req.query;
    let { page } = req.query;
    let stringLimit = '';
    let stringPage = '';

    if (limit !== undefined) stringLimit = `LIMIT ${limit}`;
    if (page === undefined) page = 0;
    else page -= 1;

    if (userId !== undefined) {
      const postsById = await connection.query(
        'SELECT * FROM posts WHERE "authorId"=$1',
        [userId]
      );
      if (postsById.rowCount <= page * 10) return res.send([]);
    }

    const numberPosts = await postRepository.getNumberPosts();

    if (numberPosts <= page * 10) return res.send([]);
    stringPage = `OFFSET ${page * 10}`;

    res.locals.limit = stringLimit;
    res.locals.page = stringPage;

    return next();
  } catch (error) {
    return res.status(500).send('There was an internal server error');
  }
}
