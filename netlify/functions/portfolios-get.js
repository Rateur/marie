// Utilisation de @netlify/neon pour se connecter à la base PostgreSQL
// La connexion se fait automatiquement via NETLIFY_DATABASE_URL ou DATABASE_URL

exports.handler = async () => {
  const { neon } = await import('@netlify/neon');
  const sql = neon(process.env.NETLIFY_DATABASE_URL || process.env.DATABASE_URL);

  try {
    const rows = await sql`SELECT id, title, subtitle, image_url, date, description FROM portfolios ORDER BY date DESC`;
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
