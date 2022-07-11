import client from './client';
import { BLOG_DATABASE_ID } from '../config';

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
		title: formattedTitle,
		id: post.id
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

	const posts = (response.results as any[]).map((post: any) => ({
		id: post.id,
		props: post.properties
	}));

	const props = await Promise.all(posts.map(async (post) => formatPost(post)));

	return props;
};

export const getOneBLog = async (id: string) => {
	const response = (await client.blocks.children.list({
		block_id: id || '26812baf-3999-43a3-88df-1686640fb5f6'
	})) as any;

	const blocks = response.results.map((result: any) => ({
		type: result.type,
		rich_text: result[result.type].rich_text.map((component: any) => ({
			type: result.type,
			text: component.text,
			annotations: component.annotations
		}))
	}));

	console.log(blocks);

	return blocks;
};
