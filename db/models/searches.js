const client = require('../client');

const searchZipCode = async (zipCode) => {
  const SQL = `SELECT users.username FROM user_profiles 
  JOIN users ON user_profiles."userId" = users.id
  WHERE zipCode = ($1) returning *`;
  return (await client.query(SQL, [zipCode])).rows[0];
};
const searchAllCriteria = async (criteria) => {
  const SQL = `SELECT users.username FROM user_profiles 
  JOIN users ON user_profiles."userId" = users.id
  WHERE zipCode = ($1) AND careerId = ($2) returning *`;
  return (await client.query(SQL, [{ criteria }])).rows[0];
};

const searchCareer = async (career_name) => {
  const SQL = `SELECT id from careers WHERE career_name = $1`;
  return (await client.query(SQL, [career_name])).rows[0];
};

module.exports = { searchZipCode, searchAllCriteria, searchCareer };
