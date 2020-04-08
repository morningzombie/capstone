const client = require('../client');
const { hash } = require('../auth');

const users = {
  read: async () => {
    return (await client.query('SELECT * from users')).rows;
  },
  create: async ({ username, password, role, email }) => {
    const SQL = `INSERT INTO users(username, password, role, email) values($1, $2, $3, $4) returning *`;
    return (
      await client.query(SQL, [username, await hash(password), role, email])
    ).rows[0];
  },
};

module.exports = users;
