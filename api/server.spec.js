const server = require('./server');
const request = require('supertest');
const db = require('../database/dbConfig.js');

beforeEach(async () => {
  await db('users').truncate()
});

it('is running with the correct db', () => {
    expect(process.env.DB_ENV).toBe('testing');
});

describe('server.js', () => {
    describe('(Route) /api/auth', () => {
        describe('[POST] on /register', () => {
            
            it('should return 201 status', async () => {
                const res = await request(server)
                    .post('/api/auth/register')
                    .send({ username: "testUser", password: "password" });
                
                expect(res.statusCode).toBe(201);
            });

            it('should return a hashed password', async () => {
                const userData = { username: "testUser", password: "password" }
                const res = await request(server)
                    .post('/api/auth/register')
                    .send(userData);

                expect(userData.password).not.toBe(res.body.newUser.password);
            });

        });

        describe('[POST] on /login', () => {
            
            it('should return 200 status', async () => {
                const newUser = await request(server)
                    .post('/api/auth/register')
                    .send({ username: "testUser", password: "password" });

                const res = await request(server)
                    .post('/api/auth/login')
                    .send({ username: "testUser", password: "password" });
                
                expect(res.statusCode).toBe(200);
            });

            it('should return 401 status', async () => {
                const newUser = await request(server)
                    .post('/api/auth/register')
                    .send({ username: "testUser", password: "password" });

                const res = await request(server)
                    .post('/api/auth/login')
                    .send({ username: "NotTestUser", password: "NotThePassword" });
                
                expect(res.statusCode).toBe(401);
            });

        });
    });

    describe('(Route) /api/jokes', () => {
        describe('[GET] on /', () => {
            
            it('should return 200 status', async () => {
                const newUser = await request(server)
                    .post('/api/auth/register')
                    .send({ username: "testUser", password: "password" });

                const token = newUser.body.token;

                const res = await request(server)
                    .get('/api/jokes')
                    .set('authorization', token)

                expect(res.statusCode).toBe(200);
            });

            it('should return 401 status', async () => {
                const res = await request(server)
                    .get('/api/jokes')
                    .set('authorization', 'this is not the token you are looking for')

                expect(res.statusCode).toBe(401);
            });
            
        });
    });
});