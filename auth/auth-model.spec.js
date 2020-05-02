const Model = require('./auth-model.js');
const db = require('../database/dbConfig.js');

beforeEach(async () => {
    await db('users').truncate()
});

it('is running with the correct db', () => {
    expect(process.env.DB_ENV).toBe('testing');
});

