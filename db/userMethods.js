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

module.exports = {
  changePassword,
};
