import supertest from 'supertest';
import app from '../src/app';
import * as databaseUtil from './utils/databaseUtil.js';
import * as usersFactory from './factories/usersFactory.js';
import * as sessionsFactory from './factories/sessionsFactory.js';
import { createManyPosts } from './factories/postsFactory';

const agent = supertest(app);

afterAll(async () => {
  await databaseUtil.clearDatabase();
});

describe('GET /hashtags/trending', () => {
  it('should return 204', async () => {
    const user = await usersFactory.createUser();
    const auth = await sessionsFactory.logIn({
      email: user.email,
      password: user.password,
    });
    const response = await agent
      .get('/hashtags/trending')
      .set('Authorization', `Bearer ${  auth.token}`);

    expect(response.status).toBe(204);
    expect(response.body).toMatchObject({});
  });
  it('should return 200 and a body', async () => {
    const user = await usersFactory.createUser();
    const auth = await sessionsFactory.logIn({
      email: user.email,
      password: user.password,
    });
    await createManyPosts(auth.token);
    const response = await agent
      .get('/hashtags/trending')
      .set('Authorization', `Bearer ${  auth.token}`);
    const keys = Object.keys(response.body[0]);
    expect(response.status).toBe(200);
    expect(keys).toStrictEqual(['count', 'name', 'id']);
  });
});
