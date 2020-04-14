const client = require('../client');

const readUserHobbies = async () => {
  return (await client.query('SELECT * from hobbies')).rows;
};

const createUserHobbies = async (user_hobbies) => {
  const SQL = `INSERT INTO user_hobbies(user_id, hobby_id)
        values($1, $2) returning *`;
  return (await client.query(SQL, [user_hobbies.userId, user_hobbies.hobbyId]))
    .rows[0];
};

module.exports = { readUserHobbies, createUserHobbies };
