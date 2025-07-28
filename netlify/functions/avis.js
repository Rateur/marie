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
      const { rows } = await client.query('SELECT * FROM avis ORDER BY id DESC');
      return { statusCode: 200, body: JSON.stringify(rows) };
    }

    if (event.headers['x-admin'] !== process.env.ADMIN_PASSWORD) {
      return { statusCode: 401, body: 'Unauthorized' };
    }

    const data = JSON.parse(event.body || '{}');
    if (event.httpMethod === 'POST') {
      const { name, content, stars } = data;
      const { rows } = await client.query('INSERT INTO avis (name, content, stars) VALUES ($1,$2,$3) RETURNING *', [name, content, stars]);
      return { statusCode: 200, body: JSON.stringify(rows[0]) };
    }

    const id = event.queryStringParameters && event.queryStringParameters.id;
    if (!id) {
      return { statusCode: 400, body: 'Missing id' };
    }

    if (event.httpMethod === 'PUT') {
      const { name, content, stars } = data;
      const { rows } = await client.query('UPDATE avis SET name=$1, content=$2, stars=$3 WHERE id=$4 RETURNING *', [name, content, stars, id]);
      return { statusCode: 200, body: JSON.stringify(rows[0]) };
    }

    if (event.httpMethod === 'DELETE') {
      await client.query('DELETE FROM avis WHERE id=$1', [id]);
      return { statusCode: 204, body: '' };
    }

    return { statusCode: 405, body: 'Method Not Allowed' };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  } finally {
    await client.end();
  }
};
