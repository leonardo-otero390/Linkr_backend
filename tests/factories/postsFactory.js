import supertest from 'supertest';
import app from '../../src/app';

const agent = supertest(app);

export async function createPost({ token, text,link }) {
  try {
    const response = await agent
      .post('/posts')
      .set('Authorization', `Bearer ${  token}`)
      .send({ text, link });
    return response.body;
  } catch (error) {
    return console.log(error);
  }
}

export async function createManyPosts(token) {
  await createPost({ token, text: '#top1', link: 'https://google.com' });
  await createPost({ token, text: '#top1', link: 'https://google.com' });
  await createPost({ token, text: '#top1', link: 'https://google.com' });
  await createPost({ token, text: '#top2', link: 'https://google.com' });
  await createPost({ token, text: '#top2', link: 'https://google.com' });
  await createPost({ token, text: '#top3', link: 'https://google.com' });
}
