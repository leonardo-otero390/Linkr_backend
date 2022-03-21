import '../src/setup';
import supertest from 'supertest';
import app from '../src/app';

describe('GET /health', () => {
  it('Should return 200 if server is running smoothly', async () => {
    const result = await supertest(app).get('/health');

    expect(result.status).toEqual(200);
  });
});
