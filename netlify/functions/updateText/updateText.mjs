import { neon } from '@netlify/neon';

const sql = neon();

export default async (req, context) => {
  try {
    const { key, content } = await req.json();

    if (!key || !content) {
      return new Response(JSON.stringify({ error: "Missing key or content" }), { status: 400 });
    }

    await sql`UPDATE texts SET content = ${content} WHERE key = ${key}`;

    return new Response(JSON.stringify({ success: true }));
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
