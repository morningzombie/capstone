const client = require('../client');

const readEmploymentStatus = async () => {
  return (await client.query('SELECT * from employment_status')).rows;
};
const createEmploymentStatus = async (empStatus) => {
  const SQL = `INSERT INTO employment_status (status_name) values($1) returning *`;
  return (await client.query(SQL, [empStatus])).rows[0];
};

module.exports = { readEmploymentStatus, createEmploymentStatus };
