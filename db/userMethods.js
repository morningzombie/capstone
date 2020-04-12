const client = require('./client');
const { hash } = require('./auth');

//changePassword
const changePassword = async ({ id, password }) => {
  return (
    await client.query(
      `UPDATE "users" set password=$1 WHERE id = $2 returning *`,
      [await hash(password), id]
    )
  ).rows[0];
};

const readCareers = async () => {
  return (await client.query(`SELECT * FROM careers`)).rows;
};

const createCareer = async (career_name) => {
  return (
    await client.query(
      'INSERT INTO careers(career_name) VALUES ($1) returning *',
      [career_name]
    )
  ).rows[0];
};

module.exports = {
  changePassword,
  createCareer,
  readCareers,
};
