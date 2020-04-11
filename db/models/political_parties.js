const client = require('../client');

const readPoliticalParties = async () => {
  return (await client.query('SELECT * from political_parties')).rows;
};
const createPoliticalParties = async (party) => {
  const SQL = `INSERT INTO political_parties (party_name) values($1) returning *`;
  return (await client.query(SQL, [party])).rows[0];
};

module.exports = { readPoliticalParties, createPoliticalParties };
