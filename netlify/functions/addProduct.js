import { Octokit } from '@octokit/rest';

export const handler = async (event, context) => {
    try {
        const { password, name, id, type } = JSON.parse(event.body);
        
        if (password !== process.env.ADMIN_PASSWORD) {
            return {
                statusCode: 401,
                body: JSON.stringify({ error: "Invalid password" })
            };
        }

        const octokit = new Octokit({
            auth: process.env.GITHUB_TOKEN
        });

        // 1. First get the current products.json content
        const { data: fileData } = await octokit.repos.getContent({
            owner: process.env.GITHUB_OWNER,
            repo: process.env.GITHUB_REPO,
            path: 'Assets/products.json'
        });

        // 2. Decode the base64 content
        const content = JSON.parse(Buffer.from(fileData.content, 'base64').toString());

        // 3. Add the new product to the array
        content.products.push({ 
            name, 
            id: parseInt(id), 
            type 
        });

        // 4. Update the file in GitHub
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
        console.error(error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ error: error.message })
        };
    }
};