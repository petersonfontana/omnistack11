const knex = require('knex');
const cfg = require('../../knexfile');

const cnn = knex(cfg.development);

module.exports = cnn;