const client = require('../client');

const readProfile = async () => {
  return (await client.query('SELECT * from user_profiles')).rows;
};

const createProfile = async (user_profile) => {
  const SQL = `INSERT INTO user_profiles("userId", gender, orientation, politicalAffiliation, religiousAffiliation, careerId, education, pets, birthdate, zipCode, employmentStatus) 
        values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning *`;
  return (
    await client.query(SQL, [
      user_profile.userId,
      user_profile.gender,
      user_profile.orientation,
      user_profile.politicalAffiliation,
      user_profile.religiousAffiliation,
      user_profile.careerId,
      user_profile.education,
      user_profile.pets,
      user_profile.birthdate,
      user_profile.zipCode,
      user_profile.employmentStatus,
    ])
  ).rows[0];
};

module.exports = { readProfile, createProfile };
