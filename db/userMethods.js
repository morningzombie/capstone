const client = require("./client");
const { hash } = require("./auth");

const readCareers = async () => {
  return (await client.query(`SELECT * FROM careers`)).rows;
};
const createCareer = async (career_name) => {
  return (
    await client.query(
      "INSERT INTO careers(career_name) VALUES ($1) returning *",
      [career_name]
    )
  ).rows[0];
};

module.exports = {
  createCareer,
  readCareers,
};
