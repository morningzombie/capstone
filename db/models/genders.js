const client = require('../client');

const readGenders = async () => {
  return (await client.query('SELECT * from genders')).rows;
};
const createGender = async (gender) => {
  const SQL = `INSERT INTO genders (gender_name) values($1) returning *`;
  return (await client.query(SQL, [gender])).rows[0];
};

module.exports = { readGenders, createGender };
