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
        const { title, subtitle, image_url, date, description } = body;
        const { rows } = await client.query(
          'INSERT INTO portfolios (id, title, subtitle, image_url, date, description) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
          [id, title, subtitle, image_url, date, description]
        );
        result = rows[0];
        break;
      }
      case 'PUT': {
        const { id, title, subtitle, image_url, date, description } = body;
        const { rows } = await client.query(
          'UPDATE portfolios SET title=$2, subtitle=$3, image_url=$4, date=$5, description=$6 WHERE id=$1 RETURNING *',
          [id, title, subtitle, image_url, date, description]
        );
        result = rows[0];
        break;
      }
      case 'DELETE': {
        const { id } = body;
        const { rows } = await client.query(
          'DELETE FROM portfolios WHERE id=$1 RETURNING *',
          [id]
        );
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
