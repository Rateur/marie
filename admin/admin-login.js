const { URL } = require('url');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { password } = JSON.parse(event.body);
  const ADMIN_PASS = process.env.ADMIN_PASS || '';

  if (password === ADMIN_PASS) {
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  }

  return {
    statusCode: 401,
    body: JSON.stringify({ success: false, message: 'Mot de passe incorrect' }),
  };
};
