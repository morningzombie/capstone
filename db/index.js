const client = require('./client');

const { authenticate, compare, findUserFromToken, hash } = require('./auth');

const models = ({ users, profiles } = require('./models'));

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
    username VARCHAR(100) NOT NULL UNIQUE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    password VARCHAR(100),
    email citext UNIQUE,
    zipCode INT,
    phoneNumber INT UNIQUE,
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
    employmentStatus VARCHAR(100)
  );
`;

  await client.query(SQL);

  const _users = {
    lucy: {
      username: 'lucy',
      password: 'LUCY',
      role: 'ADMIN',
      email: 'lucy@gmail.com',
    },
    moe: {
      username: 'moe',
      password: 'MOE',
      role: null,
      email: 'moe@gmail.com',
    },
    curly: {
      username: 'larry',
      password: 'LARRY',
      role: null,
      email: 'larry@gmail.com',
    },
  };

  const [lucy, moe, curly] = Promise.all(
    Object.values(_users).map((user) => users.create(user))
  );

  const lucyId = _users.lucy.id;
  const moeId = _users.moe.id;
  const curlyId = _users.curly.id;

  const userMap = (await users.read()).reduce((acc, user) => {
    acc[user.username] = user;
    return acc;
  }, {});

  return {
    users: userMap,
  };
};

const _profiles = {
  lucy: {
    user_id: { lucyId },
    communicationPreference: 'Email',
    gender: 'Female',
    orientation: 'Heterosexual',
    politicalAffiliation: 'Democrat',
    religiousAffiliation: 'Catholic',
    careerId: 'Teacher',
    education: 'College educated',
    pets: 'Dogs',
    age: 34,
    employmentStatus: 'Full time',
  },
  moe: {
    user_id: { moeId },
    communicationPreference: 'Email',
    gender: 'Male',
    orientation: '',
    politicalAffiliation: 'Independent',
    religiousAffiliation: 'Athiest',
    careerId: 'Brick Layer',
    education: 'Trade school',
    pets: 'Reptiles',
    age: 69,
    employmentStatus: 'Retired',
  },
  curly: {
    user_id: { curlyId },
    communicationPreference: 'Email',
    gender: '',
    orientation: 'Homosexual',
    politicalAffiliation: 'Green Party',
    religiousAffiliation: 'Protestant',
    careerId: 'Bank teller',
    education: 'High school',
    pets: 'Cats',
    age: 25,
    employmentStatus: 'Part time',
  },
};

const [lucy, moe, curly] = Promise.all(
  Object.values(_profiles).map((profile) => profiles.create(profiles))
);

// const profileMap = (await profiles.read()).reduce((acc, profile) => {
//   acc[profile.user_id] = profile;
//   return acc;
// }, {});

// return {
//   profiles: profileMap,
// };

module.exports = {
  sync,
  models,
  authenticate,
  findUserFromToken,
};
