const request = require('supertest');
const app = require('../src/app');

test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'paco',
        email: 'paco@gmail.com',
        password: 'paco123'
    }).expect(201)
})
