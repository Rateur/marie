// Récupération des avis via @netlify/neon
exports.handler = async () => {
  const { neon } = await import('@netlify/neon');
  const sql = neon(process.env.NETLIFY_DATABASE_URL || process.env.DATABASE_URL);

  try {
    const rows = await sql`SELECT id, author, rating, content, date FROM avis ORDER BY date DESC`;
    return {
      statusCode: 200,
      body: JSON.stringify({ status: 'success', data: rows })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ status: 'error', message: error.message })
    };
  }
};
