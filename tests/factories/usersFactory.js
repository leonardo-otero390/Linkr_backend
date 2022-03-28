import faker from 'faker-br';
import supertest from 'supertest';
import app from '../../src/app';

const agent = supertest(app);

export async function createUser() {
  const user = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    pictureUrl: faker.internet.avatar(),
  };

  try {
   await agent.post('/users').send(user);
    return user;
  } catch (error) {
    return console.log(error);
  }
}
