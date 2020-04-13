const client = require('../client');
const { hash } = require('../auth');

const events = {
  read: async () => {
    return (await client.query('SELECT * from events')).rows;
  },
  create: async ({ name, date, location, description, isPublic, userId }) => {
    const SQL = `INSERT INTO events(
      name,
      date,
      location,
      description,
      "isPublic",
      "userId"
      ) values($1, $2, $3, $4, $5, $6 ) returning *`;

    return (
      await client.query(SQL, [
        name,
        date,
        location,
        description,
        isPublic,
        userId,
      ])
    ).rows[0];
  },
  update: async (
    { name, date, location, description, isPublic, userId },
    id
  ) => {
    const SQL = `UPDATE "events" set  name=$1, date=$2, location=$3, description=$4, "isPublic"=$5  WHERE id = $6 returning *`;

    const updatedEvent = (
      await client.query(SQL, [
        name,
        date,
        location,
        description,
        isPublic,
        userId,
      ])
    ).rows[0];
    return updatedEvent;
  },
  delete: async (id) => {
    await client.query(`DELETE FROM "events" WHERE id=$1 returning *`, [id]);
  },
};

module.exports = events;
