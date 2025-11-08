const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { name, id, type, password } = body;

    if (!name || !id || !type || !password) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing fields' }) };
    }

    if (password !== process.env.ADMIN_PASSWORD) {
      return { statusCode: 401, body: JSON.stringify({ error: 'Invalid password' }) };
    }

    const OWNER = process.env.GITHUB_OWNER;
    const REPO = process.env.GITHUB_REPO;
    const PATH = process.env.PRODUCTS_PATH || 'Assets/products.json';
    const BRANCH = process.env.GITHUB_BRANCH || 'main';
    const TOKEN = process.env.GITHUB_TOKEN;

    if (!OWNER || !REPO || !TOKEN) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Server not configured' }) };
    }

    const getUrl = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}?ref=${BRANCH}`;
    const getRes = await fetch(getUrl, { headers: { Authorization: `token ${TOKEN}`, 'User-Agent': 'netlify-function' }});

    if (!getRes.ok) {
      const txt = await getRes.text();
      console.error('GET content failed', getRes.status, txt);
      return { statusCode: 502, body: JSON.stringify({ error: 'Failed to read products.json', detail: txt }) };
    }

    const fileData = await getRes.json();
    const content = JSON.parse(Buffer.from(fileData.content, 'base64').toString('utf8'));
    content.products = content.products || [];

    if (content.products.some(p => Number(p.id) === Number(id))) {
      return { statusCode: 409, body: JSON.stringify({ error: 'Product id already exists' }) };
    }

    const newProduct = { name, id: Number(id), type };
    content.products.push(newProduct);

    const newContentBase64 = Buffer.from(JSON.stringify(content, null, 2)).toString('base64');

    const putUrl = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`;
    const putBody = {
      message: `Add product ${id} ${name}`,
      content: newContentBase64,
      sha: fileData.sha,
      branch: BRANCH
    };

    const putRes = await fetch(putUrl, {
      method: 'PUT',
      headers: {
        Authorization: `token ${TOKEN}`,
        'User-Agent': 'netlify-function',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(putBody)
    });

    if (!putRes.ok) {
      const txt = await putRes.text();
      console.error('PUT failed', putRes.status, txt);
      return { statusCode: 502, body: JSON.stringify({ error: 'Failed to update products.json', detail: txt }) };
    }

    return { statusCode: 200, body: JSON.stringify({ added: newProduct }) };

  } catch (err) {
    console.error('Exception in function', err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};