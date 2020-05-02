const Model = require('./auth-model.js');
const db = require('../database/dbConfig.js');

it('is running with the correct db', () => {
    expect(process.env.DB_ENV).toBe('testing');
});