import supertest from 'supertest';
import app from '../src/app';

const agent = supertest(app);

describe('GET /health', () => {
  it('should return 200', async () => {
    const response = await agent.get('/health');
    expect(response.status).toBe(200);
  });
});
