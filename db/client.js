const { Client } = require('pg');

const client = new Client(
  process.env.DATABASE_URL || 'postgres://localhost/find_a_friend'
);

client.connect();

module.exports = client;
