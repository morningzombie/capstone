const client = require("../client");

const readHobbies = async () => {
  return (await client.query("SELECT * from hobbies")).rows;
};
const createHobby = async (hobby) => {
  const SQL = `INSERT INTO hobbies (hobby_name, hobby_image) values($1, $2) returning *`;
  return (await client.query(SQL, [hobby])).rows[0];
};

module.exports = { readHobbies, createHobby };
