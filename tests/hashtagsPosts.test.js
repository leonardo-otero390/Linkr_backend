import supertest from 'supertest';
import app from '../src/app';
import * as databaseUtil from './utils/databaseUtil.js';
import * as usersFactory from './factories/usersFactory.js';
import * as sessionsFactory from './factories/sessionsFactory.js';
import { createManyPosts } from './factories/postsFactory';

const agent = supertest(app);
let token;

beforeAll(async () => {
  await databaseUtil.clearDatabase();
  const user = await usersFactory.createUser();
  const auth = await sessionsFactory.logIn({
    email: user.email,
    password: user.password,
  });
  token = auth.token;
});

afterAll(() => databaseUtil.closeConnection());

describe('GET /hashtags/HASHTAG/posts', () => {
  it('should return 204', async () => {
    const response = await agent
      .get('/hashtags/teste/posts')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);
  });
  it('should return 200 and a body', async () => {
    await createManyPosts(token);
    const response = await agent
      .get('/hashtags/top1/posts')
      .set('Authorization', `Bearer ${token}`);
    const keys = Object.keys(response.body[0]);
    const postKeys = [
      'id',
      'text',
      'link',
      'linkTitle',
      'linkDescription',
      'linkImage',
      'authorId',
      'name',
      'pictureUrl',
      'likes',
      'hashtags',
    ];
    expect(response.status).toBe(200);
    expect(keys).toStrictEqual(postKeys);
  });
});
