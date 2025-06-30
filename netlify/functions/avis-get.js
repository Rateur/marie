const { Client } = require('pg');

exports.handler = async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    const { rows } = await client.query(
      'SELECT id, author, rating, content, date FROM avis ORDER BY date DESC'
    );
    return {
      statusCode: 200,
      body: JSON.stringify({ status: 'success', data: rows })
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
