const client = require('./client');

const { authenticate, compare, findUserFromToken, hash } = require('./auth');

const models = ({ users } = require('./models'));

const sync = async () => {
  const SQL = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    DROP TABLE IF EXISTS users;
    CREATE TABLE users(
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      username VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(100) NOT NULL,
      role VARCHAR(20) DEFAULT 'USER',
      CHECK (char_length(username) > 0)
    );
  `;
  await client.query(SQL);

  const _users = {
    lucy: {
      username: 'lucy',
      password: 'LUCY',
      role: 'ADMIN',
    },
    moe: {
      username: 'moe',
      password: 'MOE',
      role: null,
    },
    curly: {
      username: 'larry',
      password: 'LARRY',
      role: null,
    },
  };

  const [lucy, moe] = await Promise.all(
    Object.values(_users).map((user) => users.create(user))
  );

  const userMap = (await users.read()).reduce((acc, user) => {
    acc[user.username] = user;
    return acc;
  }, {});

  return {
    users: userMap,
  };
};

module.exports = {
  sync,
  models,
  authenticate,
  findUserFromToken,
};
