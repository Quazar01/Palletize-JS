import { Octokit } from '@octokit/rest';

export const handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { password, name, id, type } = JSON.parse(event.body);
    
    // Check password
    if (password !== process.env.ADMIN_PASSWORD) {
      return { statusCode: 401, body: "Unauthorized" };
    }

    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN
    });

    // Get current file content
    const { data: fileData } = await octokit.repos.getContent({
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
      path: 'Assets/products.json'
    });

    // Decode and parse current content
    const content = JSON.parse(Buffer.from(fileData.content, 'base64').toString());
    
    // Add new product
    content.products.push({ name, id: parseInt(id), type });

    // Update file
    await octokit.repos.createOrUpdateFileContents({
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
      path: 'Assets/products.json',
      message: `Add product ${name}`,
      content: Buffer.from(JSON.stringify(content, null, 2)).toString('base64'),
      sha: fileData.sha
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: "Product added successfully" })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: error.message })
    };
  }
};