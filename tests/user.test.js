const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');

const userOne = {
    name: 'Mike',
    email: 'mike@example.com',
    password: '56what!!'
}

beforeEach(async () => {
    await User.deleteMany();
    await new User(userOne).save();
});

//afterEach(() => {})

test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'mery',
        email: 'mery@gmail.com',
        password: 'mery123'
    }).expect(201)
});

test('Should login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('Should not login nonexisting user', async () => {
    await request(app).post('/users/login').send({
        email: 'hello@example.com',
        password: 'hello123'
    }).expect(400)
})