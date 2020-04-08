const client = require('../client');

const readCareers = async () => {
  return (await client.query('SELECT * from careers')).rows;
};
const createCareer = async (career) => {
  const SQL = `INSERT INTO careers (career_name) values($1) returning *`;
  return (await client.query(SQL, [career])).rows[0];
};

const findCareerId = async (career) => {
  const SQL = `SELECT * from careers WHERE id=$1 returning *`;
  return (await client.query(SQL, [career])).rows[0];
};

module.exports = { readCareers, createCareer, findCareerId };
