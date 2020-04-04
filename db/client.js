const { Client } = require('pg');

const client = new Client(
  process.env.DATABASE_URL || 'postgres://localhost/hobnobber'
);

client.connect();

module.exports = client;
