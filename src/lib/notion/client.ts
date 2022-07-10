import { Client } from '@notionhq/client';

import { NOTION_TOKEN } from '../config';

// Initializing a client
const client = new Client({
	auth: NOTION_TOKEN
});

export default client;
