const client = require('./client');

const { authenticate, compare, findUserFromToken, hash } = require('./auth');

const models = ({ users } = require('./models'));

const sync = async () => {
  let SQL = `
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  CREATE EXTENSION IF NOT EXISTS citext;
  DROP TABLE IF EXISTS user_group CASCADE;
  DROP TABLE IF EXISTS user_profile CASCADE;
  DROP TABLE IF EXISTS user_hobbies CASCADE;
  DROP TABLE IF EXISTS meetup_locations CASCADE;
  DROP TABLE IF EXISTS careers CASCADE;
  DROP TABLE IF EXISTS hobbies CASCADE;
  DROP TABLE IF EXISTS user_rating CASCADE;
  DROP TABLE IF EXISTS users CASCADE;

  CREATE TABLE users(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE,
    zipcode VARCHAR(5),
    email citext UNIQUE,
    password VARCHAR(100),
    birthday DATE NOT NULL ,
    gender VARCHAR(20),
    user_profile_id UUID,
    user_group_id UUID,
    userRating INT DEFAULT 0,
    role VARCHAR(20) DEFAULT 'USER',
    CHECK (char_length(username) > 0)
  );
  CREATE TABLE careers(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    career_name VARCHAR(100) NOT NULL
  );
  CREATE TABLE hobbies(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hobby_name VARCHAR(20) NOT NULL
  );
  CREATE TABLE meetup_locations(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    address VARCHAR(100),
    city VARCHAR(50),
    state VARCHAR(20),
    zip_code INT
  );

  CREATE TABLE user_hobbies(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hobby_id UUID REFERENCES hobbies(id),
    user_id UUID REFERENCES users(id)
  );

  CREATE TABLE user_rating(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    rating INT
  );
  CREATE TABLE user_group(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    name VARCHAR(100)
  );
  CREATE TABLE user_profile(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    gender VARCHAR(100),
    orientation VARCHAR(100),
    politicalAffiliation VARCHAR(100),
    religiousAffiliation VARCHAR(100),
    careerId UUID REFERENCES careers(id),
    education VARCHAR(100),
    pets VARCHAR(100),
    ageRange VARCHAR(100),
    financialStatus VARCHAR(100)
  );

  ALTER TABLE users
  ADD FOREIGN KEY (user_profile_id)
  REFERENCES user_profile(id);

  ALTER TABLE users
  ADD FOREIGN KEY (user_group_id)
  REFERENCES user_group(id);
`;

  await client.query(SQL);

  const _users = {
    lucy: {
      firstname: 'Lucy',
      lastname: 'Anabell',
      username: 'lucy',
      zipcode: '12345',
      email: 'lucy@gmail.com',
      password: 'LUCY',
      birthday: '12/31/1999',
      gender: 'female',
      role: 'ADMIN',
    },
    moe: {
      firstname: 'Moe',
      lastname: 'Anabell',
      username: 'moe',
      zipcode: '12345',
      email: 'moe@gmail.com',
      password: 'MOE',
      birthday: '12/31/1999',
      gender: 'male',
      role: 'USER',
    },
    curly: {
      firstname: 'Larry',
      lastname: 'Smith',
      username: 'larry',
      zipcode: '12345',
      email: 'larry@gmail.com',
      password: 'LARRY',
      birthday: '12/31/1999',
      gender: 'female',
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
