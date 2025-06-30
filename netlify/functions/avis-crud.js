const { Client } = require('pg');
const { randomUUID } = require('crypto');

exports.handler = async (event) => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  let body = {};
  if (event.body) {
    try { body = JSON.parse(event.body); } catch (e) {}
  }

  try {
    await client.connect();
    let result;
    switch (event.httpMethod) {
      case 'POST': {
        const id = body.id || randomUUID();
        const { author, rating, content, date } = body;
        const { rows } = await client.query(
          'INSERT INTO avis (id, author, rating, content, date) VALUES ($1,$2,$3,$4,$5) RETURNING *',
          [id, author, rating, content, date]
        );
        result = rows[0];
        break;
      }
      case 'PUT': {
        const { id, author, rating, content, date } = body;
        const { rows } = await client.query(
          'UPDATE avis SET author=$2, rating=$3, content=$4, date=$5 WHERE id=$1 RETURNING *',
          [id, author, rating, content, date]
        );
        result = rows[0];
        break;
      }
      case 'DELETE': {
        const { id } = body;
        const { rows } = await client.query('DELETE FROM avis WHERE id=$1 RETURNING *', [id]);
        result = rows[0];
        break;
      }
      default:
        return { statusCode: 405, body: JSON.stringify({ status: 'error', message: 'Method Not Allowed' }) };
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ status: 'success', data: result })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ status: 'error', message: error.message })
    };
  } finally {
    await client.end().catch(() => {});
  }
};
