import { Octokit } from "@octokit/rest";

export const handler = async (event) => {
  console.log("addProduct invoked");
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const payload = JSON.parse(event.body || "{}");
    const { password, name, id, type } = payload;
    console.log("payload (masked):", { password: password ? "***" : null, name, id, type });

    const missing = ["ADMIN_PASSWORD", "GITHUB_TOKEN", "GITHUB_OWNER", "GITHUB_REPO"].filter(k => !process.env[k]);
    if (missing.length) {
      console.error("Missing env:", missing);
      return { statusCode: 500, body: JSON.stringify({ error: `Missing env: ${missing.join(",")}` }) };
    }

    if (password !== process.env.ADMIN_PASSWORD) {
      return { statusCode: 401, body: JSON.stringify({ error: "Unauthorized" }) };
    }

    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;
    const branch = process.env.GITHUB_BRANCH; // optional
    const path = "Assets/products.json";
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

    let fileData;
    try {
      const params = { owner, repo, path };
      if (branch) params.ref = branch;
      const resp = await octokit.repos.getContent(params);
      fileData = resp.data;
      console.log("Got fileData.sha:", fileData.sha);
    } catch (err) {
      // If 404, we'll create the file
      if (err.status === 404) {
        console.warn("products.json not found, will create a new one");
        fileData = null;
      } else {
        console.error("Error getting content:", err);
        throw err;
      }
    }

    let contentObj;
    if (fileData && fileData.content) {
      const decoded = Buffer.from(fileData.content, "base64").toString("utf8");
      contentObj = JSON.parse(decoded);
      contentObj.products = contentObj.products || [];
    } else {
      contentObj = { products: [] };
    }

    contentObj.products.push({ name, id: parseInt(id, 10), type });

    const newContentBase64 = Buffer.from(JSON.stringify(contentObj, null, 2)).toString("base64");

    const updateParams = {
      owner,
      repo,
      path,
      message: `Add product ${name}`,
      content: newContentBase64
    };
    if (fileData && fileData.sha) updateParams.sha = fileData.sha;
    if (branch) updateParams.branch = branch;

    const updateResp = await octokit.repos.createOrUpdateFileContents(updateParams);
    console.log("Update response:", updateResp.status);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Product added successfully" })
    };
  } catch (err) {
    console.error("Unhandled error:", err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};