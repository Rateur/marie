const { randomUUID } = require('crypto');

exports.handler = async (event) => {
  const { neon } = await import('@netlify/neon');
  const sql = neon(process.env.NETLIFY_DATABASE_URL || process.env.DATABASE_URL);

  let body = {};
  if (event.body) {
    try { body = JSON.parse(event.body); } catch (e) {}
  }

  try {
    let result;
    switch (event.httpMethod) {
      case 'POST': {
        const id = body.id || randomUUID();
        const { author, rating, content, date } = body;
        const rows = await sql`INSERT INTO avis (id, author, rating, content, date) VALUES (${id}, ${author}, ${rating}, ${content}, ${date}) RETURNING *`;
        result = rows[0];
        break;
      }
      case 'PUT': {
        const { id, author, rating, content, date } = body;
        const rows = await sql`UPDATE avis SET author=${author}, rating=${rating}, content=${content}, date=${date} WHERE id=${id} RETURNING *`;
        result = rows[0];
        break;
      }
      case 'DELETE': {
        const { id } = body;
        const rows = await sql`DELETE FROM avis WHERE id=${id} RETURNING *`;
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
  }
};
