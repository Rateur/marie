const { Client } = require('pg');

async function connect() {
  const client = new Client({
    connectionString: process.env.NETLIFY_DATABASE_URL_UNPOOLED,
    ssl: { rejectUnauthorized: false }
  });
  await client.connect();
  return client;
}

exports.handler = async function(event) {
  const client = await connect();

  try {
    if (event.httpMethod === 'GET') {
      const { rows } = await client.query('SELECT * FROM portfolio ORDER BY id DESC');
      return { statusCode: 200, body: JSON.stringify(rows) };
    }

    if (event.headers['x-admin'] !== process.env.ADMIN_PASSWORD) {
      return { statusCode: 401, body: 'Unauthorized' };
    }

    const data = JSON.parse(event.body || '{}');
    if (event.httpMethod === 'POST') {
      const { title, description, image_url } = data;
      const { rows } = await client.query('INSERT INTO portfolio (title, description, image_url) VALUES ($1,$2,$3) RETURNING *', [title, description, image_url]);
      return { statusCode: 200, body: JSON.stringify(rows[0]) };
    }

    const id = event.queryStringParameters && event.queryStringParameters.id;
    if (!id) {
      return { statusCode: 400, body: 'Missing id' };
    }

    if (event.httpMethod === 'PUT') {
      const { title, description, image_url } = data;
      const { rows } = await client.query('UPDATE portfolio SET title=$1, description=$2, image_url=$3 WHERE id=$4 RETURNING *', [title, description, image_url, id]);
      return { statusCode: 200, body: JSON.stringify(rows[0]) };
    }

    if (event.httpMethod === 'DELETE') {
      await client.query('DELETE FROM portfolio WHERE id=$1', [id]);
      return { statusCode: 204, body: '' };
    }

    return { statusCode: 405, body: 'Method Not Allowed' };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  } finally {
    await client.end();
  }
};
