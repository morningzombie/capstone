const client = require("./client");
const fs = require("fs");

const { authenticate, compare, findUserFromToken, hash } = require("./auth");

const models = ({
  users,
  profiles,
  careers,
  hobbies,
  religions,
  genders,
} = require("./models"));

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
  DROP TABLE IF EXISTS genders CASCADE;
  DROP TABLE IF EXISTS religions CASCADE;
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
    communicationPreference VARCHAR(5),
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
  CREATE TABLE religions(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    religion_name VARCHAR(100) NOT NULL
  );
  CREATE TABLE genders(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    gender_name VARCHAR(100) NOT NULL
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
    gender VARCHAR(100),
    orientation VARCHAR(100),
    politicalAffiliation VARCHAR(100),
    religiousAffiliation VARCHAR(100),
    careerId UUID REFERENCES careers(id),
    education VARCHAR(100),
    pets VARCHAR(100),
    birthdate DATE,
    zipCode INT,
    employmentStatus VARCHAR(100)
  );

  INSERT INTO hobbies (hobby_name, hobby_image) VALUES ('Arts & Crafts', 'art.png');
  INSERT INTO hobbies (hobby_name, hobby_image) VALUES ('Books', 'books.png');
  INSERT INTO hobbies (hobby_name, hobby_image) VALUES ('Camping', 'camping.png');
  INSERT INTO hobbies (hobby_name, hobby_image) VALUES ('Collecting', 'collecting.png');
  INSERT INTO hobbies (hobby_name, hobby_image) VALUES ('Computers & Gaming', 'computers.png');
  INSERT INTO hobbies (hobby_name, hobby_image) VALUES ('DIY', 'DIY.png');
  INSERT INTO hobbies (hobby_name, hobby_image) VALUES ('Food & Drinks', 'food.png');
  INSERT INTO hobbies (hobby_name, hobby_image) VALUES ('Games', 'games.png');
  INSERT INTO hobbies (hobby_name, hobby_image) VALUES ('Gardening', 'gardening.png');
  INSERT INTO hobbies (hobby_name, hobby_image) VALUES ('Movies', 'movies.png');
  INSERT INTO hobbies (hobby_name, hobby_image) VALUES ('Music', 'music.png');
  INSERT INTO hobbies (hobby_name, hobby_image) VALUES ('Performing Arts', 'performing.png');
  INSERT INTO hobbies (hobby_name, hobby_image) VALUES ('Pets', 'pet.png');
  INSERT INTO hobbies (hobby_name, hobby_image) VALUES ('Photography', 'photography.png');
  INSERT INTO hobbies (hobby_name, hobby_image) VALUES ('Sewing', 'sewing.png');
  INSERT INTO hobbies (hobby_name, hobby_image) VALUES ('Shopping', 'shopping.png');
  INSERT INTO hobbies (hobby_name, hobby_image) VALUES ('Sports & Outdoors', 'sports.png');
  INSERT INTO hobbies (hobby_name, hobby_image) VALUES ('Travel', 'travel.png');

  INSERT INTO religions (religion_name) VALUES ('Christianity');
  INSERT INTO religions (religion_name) VALUES ('Islam');
  INSERT INTO religions (religion_name) VALUES ('Nonreligious');
  INSERT INTO religions (religion_name) VALUES ('Hinduism');
  INSERT INTO religions (religion_name) VALUES ('Chinese traditional');
  INSERT INTO religions (religion_name) VALUES ('Buddhism');
  INSERT INTO religions (religion_name) VALUES ('Primal-indigenous');
  INSERT INTO religions (religion_name) VALUES ('African traditional');
  INSERT INTO religions (religion_name) VALUES ('Sikhism');
  INSERT INTO religions (religion_name) VALUES ('Juche');
  INSERT INTO religions (religion_name) VALUES ('Spiritism');
  INSERT INTO religions (religion_name) VALUES ('Judaism');
  INSERT INTO religions (religion_name) VALUES ('Bahai');
  INSERT INTO religions (religion_name) VALUES ('Jainism');
  INSERT INTO religions (religion_name) VALUES ('Shinto');
  INSERT INTO religions (religion_name) VALUES ('Cao Dai');
  INSERT INTO religions (religion_name) VALUES ('Zoroastrianism');
  INSERT INTO religions (religion_name) VALUES ('Tenrikyo');
  INSERT INTO religions (religion_name) VALUES ('Neo-Paganism');
  INSERT INTO religions (religion_name) VALUES ('Unitarian-Universalism');

  INSERT INTO genders (gender_name) VALUES ('Agender');
  INSERT INTO genders (gender_name) VALUES ('Androgyne');
  INSERT INTO genders (gender_name) VALUES ('Androgynous');
  INSERT INTO genders (gender_name) VALUES ('Bigender');
  INSERT INTO genders (gender_name) VALUES ('Cis');
  INSERT INTO genders (gender_name) VALUES ('Cis Female');
  INSERT INTO genders (gender_name) VALUES ('Cis Male');
  INSERT INTO genders (gender_name) VALUES ('Cis Man');
  INSERT INTO genders (gender_name) VALUES ('Cis Woman');
  INSERT INTO genders (gender_name) VALUES ('Cisgender');
  INSERT INTO genders (gender_name) VALUES ('Cisgender Female');
  INSERT INTO genders (gender_name) VALUES ('Cisgender Male');
  INSERT INTO genders (gender_name) VALUES ('Cisgender Man');
  INSERT INTO genders (gender_name) VALUES ('Cisgender Woman');
  INSERT INTO genders (gender_name) VALUES ('Female to Male');
  INSERT INTO genders (gender_name) VALUES ('FTM');
  INSERT INTO genders (gender_name) VALUES ('Gender Fluid');
  INSERT INTO genders (gender_name) VALUES ('Gender Nonconforming');
  INSERT INTO genders (gender_name) VALUES ('Gender Questioning');
  INSERT INTO genders (gender_name) VALUES ('Gender Variant');
  INSERT INTO genders (gender_name) VALUES ('Genderqueer');
  INSERT INTO genders (gender_name) VALUES ('Intersex');
  INSERT INTO genders (gender_name) VALUES ('Male to Female');
  INSERT INTO genders (gender_name) VALUES ('MTF');
  INSERT INTO genders (gender_name) VALUES ('Neither');
  INSERT INTO genders (gender_name) VALUES ('Neutrois');
  INSERT INTO genders (gender_name) VALUES ('Non-binary');
  INSERT INTO genders (gender_name) VALUES ('Other');
  INSERT INTO genders (gender_name) VALUES ('Pangender');
  INSERT INTO genders (gender_name) VALUES ('Trans');
  INSERT INTO genders (gender_name) VALUES ('Trans Female');
  INSERT INTO genders (gender_name) VALUES ('Trans Male');
  INSERT INTO genders (gender_name) VALUES ('Trans Man');
  INSERT INTO genders (gender_name) VALUES ('Trans Person');
  INSERT INTO genders (gender_name) VALUES ('Trans Woman');
  INSERT INTO genders (gender_name) VALUES ('Trans');
  INSERT INTO genders (gender_name) VALUES ('Trans Female');
  INSERT INTO genders (gender_name) VALUES ('Trans Male');
  INSERT INTO genders (gender_name) VALUES ('Trans Man');
  INSERT INTO genders (gender_name) VALUES ('Trans Person');
  INSERT INTO genders (gender_name) VALUES ('Trans Woman');
  INSERT INTO genders (gender_name) VALUES ('Transfeminine');
  INSERT INTO genders (gender_name) VALUES ('Transgender');
  INSERT INTO genders (gender_name) VALUES ('Transgender Female');
  INSERT INTO genders (gender_name) VALUES ('Transgender Male');
  INSERT INTO genders (gender_name) VALUES ('Transgender Man');
  INSERT INTO genders (gender_name) VALUES ('Transgender Person');
  INSERT INTO genders (gender_name) VALUES ('Transgender Woman');
  INSERT INTO genders (gender_name) VALUES ('Transmasculine');
  INSERT INTO genders (gender_name) VALUES ('Transsexual');
  INSERT INTO genders (gender_name) VALUES ('Transsexual Female');
  INSERT INTO genders (gender_name) VALUES ('Transsexual Male');
  INSERT INTO genders (gender_name) VALUES ('Transsexual Man');
  INSERT INTO genders (gender_name) VALUES ('Transsexual Person');
  INSERT INTO genders (gender_name) VALUES ('Transsexual Woman');
  INSERT INTO genders (gender_name) VALUES ('Two-spirit');
`;

  await client.query(SQL);

  const _users = {
    lucy: {
      firstname: "Lucy",
      lastname: "Anabell",
      username: "lucy",
      zipcode: "12345",
      email: "lucy@gmail.com",
      password: "LUCY",
      birthday: "12/31/1999",
      gender: "female",
      role: "ADMIN",
    },
    moe: {
      firstname: "Moe",
      lastname: "Anabell",
      username: "moe",
      zipcode: "12345",
      email: "moe@gmail.com",
      password: "MOE",
      birthday: "12/31/1999",
      gender: "male",
      role: "USER",
    },
    curly: {
      firstname: "Larry",
      lastname: "Smith",
      username: "larry",
      zipcode: "12345",
      email: "larry@gmail.com",
      password: "LARRY",
      birthday: "12/31/1999",
      gender: "female",
    },
  };

  const [lucy, moe, curly] = await Promise.all(
    Object.values(_users).map((user) => users.create(user))
  );

  const userMap = (await users.read()).reduce((acc, user) => {
    acc[user.username] = user;
    return acc;
  }, {});

  Promise.all([
    careers.createCareer("Computers and Technology"),
    careers.createCareer("Health Care and Allied Health"),
    careers.createCareer("Education and Social Services"),
    careers.createCareer("Arts and Communications"),
    careers.createCareer("Trades and Transportation"),
    careers.createCareer("Management, Business, and Finance"),
    careers.createCareer("Architecture and Civil Engineering"),
    careers.createCareer("Science"),
    careers.createCareer("Hospitality, Tourism, and the Service Industry"),
    careers.createCareer("Law and Law Enforcement"),
    careers.createCareer("Other"),
  ]);

  const compid = await careers
    .findCareerId("Computers and Technology")
    .then((response) => response.id);
  const eduid = await careers
    .findCareerId("Education and Social Services")
    .then((response) => response.id);
  const othid = await careers
    .findCareerId("Other")
    .then((response) => response.id);

  const lucyid = await users.findUserId("lucy").then((response) => response.id);
  const moeid = await users.findUserId("moe").then((response) => response.id);
  const curlyid = await users
    .findUserId("larry")
    .then((response) => response.id);

  Promise.all([
    profiles.createProfile({
      userId: lucyid,
      communicationPreference: "Email",
      gender: "Female",
      orientation: "Heterosexual",
      politicalAffiliation: "Democrat",
      religiousAffiliation: "Catholic",
      careerId: eduid,
      education: "College educated",
      pets: "Dogs",
      birthdate: "2/2/1996",
      zipCode: 32207,
      employmentStatus: "Full time",
    }),
    profiles.createProfile({
      userId: moeid,
      communicationPreference: "Email",
      gender: "Male",
      orientation: "",
      politicalAffiliation: "Independent",
      religiousAffiliation: "Athiest",
      careerId: othid,
      education: "Trade school",
      pets: "Reptiles",
      birthdate: "5/5/1960",
      zipCode: 32210,
      employmentStatus: "Retired",
    }),
    profiles.createProfile({
      userId: curlyid,
      communicationPreference: "Email",
      gender: "",
      orientation: "Homosexual",
      politicalAffiliation: "Green Party",
      religiousAffiliation: "Protestant",
      careerId: compid,
      education: "High school",
      pets: "Cats",
      birthdate: "10/10/1980",
      zipCode: 32073,
      employmentStatus: "Part time",
    }),
  ]);

  return {
    users: userMap,
  };
};
const readCareers = async () => {
  return (await client.query("SELECT * from careers")).rows;
};
const readHobbies = async () => {
  return (await client.query("SELECT * from hobbies")).rows;
};
module.exports = {
  sync,
  models,
  authenticate,
  findUserFromToken,
  readCareers,
  readHobbies,
};
