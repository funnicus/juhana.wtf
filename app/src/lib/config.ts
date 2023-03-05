import { config } from 'dotenv';
config();

export const NOTION_TOKEN = process.env.NOTION_TOKEN;
export const BLOG_DATABASE_ID = process.env.BLOG_DATABASE_ID;
