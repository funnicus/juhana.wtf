import { Client } from '@notionhq/client';

import { NOTION_TOKEN, BLOG_DATABASE_ID } from '../config';

// Initializing a client
const client = new Client({
	auth: NOTION_TOKEN
});

export const test = async () => {
	const databaseId = BLOG_DATABASE_ID;

	if (!databaseId) throw new Error('No database ID!');
	const response = await client.databases.query({ database_id: databaseId });

	console.log(response);
};

export default client;
