/* eslint-env jest */
const request = require('supertest');
const createApp = require('../../bin/app');

const app = createApp();

describe('Endpoints: dummy', () => {
  it('should get hello world message', async () => {
    const response = await request(app).get('/hello/bob');
    const { body, status } = response;
    expect(status).toEqual(200);
    expect(body).toEqual({
      greeting: 'Hello, bob!',
    });
  });

  it('should get error', async () => {
    const response = await request(app).get('/error');
    const { body, status } = response;
    expect(status).toEqual(418);
    expect(body).toEqual({
      message: 'Error message',
    });
  });
});
