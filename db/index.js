const client = require("./client");
const fs = require("fs");

const { authenticate, compare, findUserFromToken, hash } = require("./auth");

const models = ({ users, hobbies } = require("./models"));

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
    hobby_name VARCHAR(20) NOT NULL,
    hobby_image VARCHAR
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

  INSERT INTO hobbies (hobby_name) VALUES ('Art');
  INSERT INTO hobbies (hobby_name) VALUES ('Fishing');

`;

  await client.query(SQL);

  const _users = {
    lucy: {
      username: "lucy",
      password: "LUCY",
      role: "ADMIN",
      email: "lucy@gmail.com",
    },
    moe: {
      username: "moe",
      password: "MOE",
      role: null,
      email: "moe@gmail.com",
    },
    curly: {
      username: "larry",
      password: "LARRY",
      role: null,
      email: "larry@gmail.com",
    },
  };

  // const readHobbies = async () => {
  //   return (await client.query("SELECT * FROM hobbies")).rows;
  // };
  // const createHobbies = async ({ hobby_name }) => {
  //   return (
  //     await client.query(
  //       "INSERT INTO hobbies(hobby_name) VALUES ($1) returning *",
  //       [hobby_name]
  //     )
  //   ).rows[0];
  // };
  // const _hobbies = {
  //   art: {
  //     hobby_name: "Art",
  //   },
  //   fishing: {
  //     hobby_name: "Fishing",
  //   },
  // };

  const [lucy, moe] = await Promise.all(
    Object.values(_users).map((user) => users.create(user))
  );
  // const [art, fishing] = await Promise.all(
  //   Object.values(_hobbies).map((hobby) => {
  //     console.log(hobbies.create);
  //     hobbies.create(hobby);
  //   })
  // );

  const userMap = (await users.read()).reduce((acc, user) => {
    acc[user.username] = user;
    return acc;
  }, {});

  // const hobbyMap = (await hobbies.read()).reduce((acc, hobby) => {
  //   acc[hobby.hobby_name] = hobby;
  //   return acc;
  // }, {});

  return {
    users: userMap,
    // hobbies: hobbyMap,
  };
};

module.exports = {
  sync,
  models,
  authenticate,
  findUserFromToken,
  // readHobbies,
  // createHobbies,
};
