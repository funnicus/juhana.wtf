import { z } from 'zod';

import client from './client';
import { BLOG_DATABASE_ID } from '../config';
import fs from 'fs';

//type PostsResult = Array<{}>;

const Blogs = z
	.object({
		tags: z.object({ id: z.string() }),
		status: z.object({ id: z.string() })
	})
	.array();

const getProperty = async (pageId: string, propertyId: string) => {
	const response = await client.pages.properties.retrieve({
		page_id: pageId,
		property_id: propertyId
	});

	return response;
};

const formatPost = async (post: { id: string; props: any }) => {
	const { tags, status, publishDate, excerpt, Name } = post.props;

	// TODO: remove any
	const formattedExcerpt = ((await getProperty(post.id, excerpt.id)) as any).results[0].rich_text
		.plain_text;
	const formattedDate = ((await getProperty(post.id, publishDate.id)) as any).date.start;
	const formattedStatus = ((await getProperty(post.id, status.id)) as any).select.name;
	const formattedTags = ((await getProperty(post.id, tags.id)) as any).multi_select.map(
		(tag: any) => tag.name
	);
	const formattedTitle = ((await getProperty(post.id, Name.id)) as any).results[0].title.plain_text;

	return {
		tags: formattedTags,
		status: formattedStatus,
		publishDate: formattedDate,
		excerpt: formattedExcerpt,
		title: formattedTitle
	};
};

export const getBlogs = async () => {
	const databaseId = BLOG_DATABASE_ID;

	if (!databaseId) throw new Error('No database ID!');

	const response = await client.databases.query({
		database_id: databaseId,
		sorts: [
			{
				property: 'publishDate',
				direction: 'descending'
			}
		]
	});

	//fs.writeFileSync('./res.json', JSON.stringify(response));

	const posts = (response.results as unknown[]).map((post: any) => ({
		id: post.id,
		props: post.properties
	}));

	const props = await Promise.all(posts.map(async (post) => formatPost(post)));
	console.log(response);

	return props;
};
