const server = require('./server');
const request = require('supertest');

it('is running with the correct db', () => {
    expect(process.env.DB_ENV).toBe('testing');
});