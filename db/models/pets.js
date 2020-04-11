const client = require('../client');

const readPets = async () => {
  return (await client.query('SELECT * from pets')).rows;
};
const createPet = async (pet) => {
  const SQL = `INSERT INTO pets (pet_name) values($1) returning *`;
  return (await client.query(SQL, [pet])).rows[0];
};

module.exports = { readPets, createPet };
