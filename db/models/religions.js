const client = require('../client');

const readReligions = async () => {
  return (await client.query('SELECT * from religions')).rows;
};
const createReligion = async (religion) => {
  const SQL = `INSERT INTO religions (religion_name) values($1) returning *`;
  return (await client.query(SQL, [religion])).rows[0];
};

module.exports = { readReligions, createReligion };
