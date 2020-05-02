const db = require('../database/dbConfig');

module.exports = {
    findBy,
    findById,
    insertUser
}

function findBy(filter) {
    return db('users')
        .where(filter)
};

function findById(id) {
    return db('users')
        .where({ id })
        .first();
};

function insertUser(userData) {
    const [id] = await db('users').insert(userData);
    return findById(id);
};
