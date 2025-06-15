import { neon } from '@netlify/neon';

const sql = neon(); // utilise automatiquement la variable NETLIFY_DATABASE_URL

export default async (req, context) => {
  try {
    const rows = await sql`SELECT * FROM texts`;
    return Response.json(rows);
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
