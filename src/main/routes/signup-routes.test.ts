import request from 'supertest';
import app from '../config/app';

describe('Signup Routes', () => {
  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Wilgner',
        email: 'wilgner@gandaya.io',
        password: '123',
        passwordConfirmation: '123',
      })
      .expect(200);
  });
});
