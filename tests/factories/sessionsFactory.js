import supertest from 'supertest';
import app from '../../src/app';

const agent = supertest(app);

export async function logIn({ email, password }) {
  try {
    const response = await agent.post('/sessions').send({ email, password });
    return response.body;
  } catch (error) {
    return console.log(error);
  }
}
