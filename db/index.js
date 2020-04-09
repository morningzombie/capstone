const client = require('./client');
const fs = require('fs');

const { authenticate, compare, findUserFromToken, hash } = require('./auth');

const models = ({ users, profiles, careers, hobbies } = require('./models'));

const sync = async () => {
  let SQL = `
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  CREATE EXTENSION IF NOT EXISTS citext;
  DROP TABLE IF EXISTS user_groups CASCADE;
  DROP TABLE IF EXISTS user_profiles CASCADE;
  DROP TABLE IF EXISTS user_hobbies CASCADE;
  DROP TABLE IF EXISTS meetup_locations CASCADE;
  DROP TABLE IF EXISTS careers CASCADE;
  DROP TABLE IF EXISTS hobbies CASCADE;
  DROP TABLE IF EXISTS user_ratings CASCADE;
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
   -- zipCode INT,
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

  CREATE TABLE user_ratings(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    rating INT
  );
  CREATE TABLE user_groups(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    name VARCHAR(100)
  );
  CREATE TABLE user_profiles(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "userId" UUID REFERENCES users(id),
    communicationPreference VARCHAR(5),
    gender VARCHAR(100),
    orientation VARCHAR(100),
    politicalAffiliation VARCHAR(100),
    religiousAffiliation VARCHAR(100),
    careerId UUID REFERENCES careers(id),
    education VARCHAR(100),
    pets VARCHAR(100),
    age INT,
    employmentStatus VARCHAR(100)
  );

  INSERT INTO hobbies (hobby_name) VALUES ('Art');
  INSERT INTO hobbies (hobby_name) VALUES ('Fishing');

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

  const [lucy, moe, curly] = await Promise.all(
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
  //console.log(userMap);

  // const hobbyMap = (await hobbies.read()).reduce((acc, hobby) => {
  //   acc[hobby.hobby_name] = hobby;
  //   return acc;
  // }, {});

  Promise.all([
    careers.createCareer('Computers and Technology'),
    careers.createCareer('Health Care and Allied Health'),
    careers.createCareer('Education and Social Services'),
    careers.createCareer('Arts and Communications'),
    careers.createCareer('Trades and Transportation'),
    careers.createCareer('Management, Business, and Finance'),
    careers.createCareer('Architecture and Civil Engineering'),
    careers.createCareer('Science'),
    careers.createCareer('Hospitality, Tourism, and the Service Industry'),
    careers.createCareer('Law and Law Enforcement'),
    careers.createCareer('Other'),
  ]);

  const compid = await careers
    .findCareerId('Computers and Technology')
    .then((response) => response.id);
  const eduid = await careers
    .findCareerId('Education and Social Services')
    .then((response) => response.id);
  const othid = await careers
    .findCareerId('Other')
    .then((response) => response.id);

  const lucyid = await users.findUserId('lucy').then((response) => response.id);
  const moeid = await users.findUserId('moe').then((response) => response.id);
  const curlyid = await users
    .findUserId('larry')
    .then((response) => response.id);

  //console.log('curly', curlyid);

  Promise.all([
    profiles.createProfile({
      userId: lucyid,
      communicationPreference: 'Email',
      gender: 'Female',
      orientation: 'Heterosexual',
      politicalAffiliation: 'Democrat',
      religiousAffiliation: 'Catholic',
      careerId: eduid,
      education: 'College educated',
      pets: 'Dogs',
      age: 34,
      employmentStatus: 'Full time',
    }),
    profiles.createProfile({
      userId: moeid,
      communicationPreference: 'Email',
      gender: 'Male',
      orientation: '',
      politicalAffiliation: 'Independent',
      religiousAffiliation: 'Athiest',
      careerId: othid,
      education: 'Trade school',
      pets: 'Reptiles',
      age: 69,
      employmentStatus: 'Retired',
    }),
    profiles.createProfile({
      userId: curlyid,
      communicationPreference: 'Email',
      gender: '',
      orientation: 'Homosexual',
      politicalAffiliation: 'Green Party',
      religiousAffiliation: 'Protestant',
      careerId: compid,
      education: 'High school',
      pets: 'Cats',
      age: 25,
      employmentStatus: 'Part time',
    }),
  ]);

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
