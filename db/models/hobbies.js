const client = require("../client");

const hobbies = {
  read: async () => {
    return (await client.query("SELECT * from hobbies")).rows;
  },
  create: async ({ name, image }) => {
    const SQL = `INSERT INTO hobbies(name, image) values($1, $2) returning *`;
    return (await client.query(SQL, [name, image])).rows[0];
  },
};

module.exports = hobbies;
