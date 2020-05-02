const Model = require('./auth-model.js');
const db = require('../database/dbConfig.js');

beforeEach(async () => {
    await db('users').truncate()
});

it('is running with the correct db', () => {
    expect(process.env.DB_ENV).toBe('testing');
});

describe('auth-model.js', () => {
    describe('insertUser', () => {

        it('should insert users', async () => {
            let users

            users = await db('users')
            expect(users).toHaveLength(0)

            await Model.insertUser({ username: 'testUser1', password: 'examplePass'})
            users = await db('users')
            expect(users).toHaveLength(1)

            await Model.insertUser({ username: 'testUser2', password: 'examplePass'})
            users = await db('users')
            expect(users).toHaveLength(2)
        });
    });

    describe('findById', () => {

        it('should find users by id', async () => {
            const userData = { username: 'testUser1', password: 'examplePass'};
            await Model.insertUser(userData)
            const user = await Model.findById(1)
            expect(user.username).toBe(userData.username)
            expect(user.password).toBe(userData.password)
        });

        it('should not find user by id, return undefined', async () => {
            const userData = { username: 'testUser1', password: 'examplePass'};
            await Model.insertUser(userData)
            const user = await Model.findById(2)
            expect(user).toBe(undefined);
        });
    });
});