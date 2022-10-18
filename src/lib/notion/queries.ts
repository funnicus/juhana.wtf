import client from './client';
import { BLOG_DATABASE_ID } from '../config';
import {
	BlogBlocks,
	BlogDatabase,
	DateProp,
	MultiSelect,
	ResultRichText,
	Select,
	Title
} from './validators';
import cache from './cache';
import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

const getProperty = async (pageId: string, propertyId: string) => {
	const fromCache = cache.get(`${pageId}-${propertyId}`);

	if (fromCache) return fromCache;

	const response = await client.pages.properties.retrieve({
		page_id: pageId,
		property_id: propertyId
	});

	cache.set(`${pageId}-${propertyId}`, response);

	return response;
};

const getDatabase = async (id: string, amount?: number): Promise<QueryDatabaseResponse> => {
	const fromCache = cache.get(`${id}-${amount}`);

	if (fromCache) return fromCache as QueryDatabaseResponse;

	const response = await client.databases.query({
		database_id: id,
		sorts: [
			{
				property: 'publishDate',
				direction: 'descending'
			}
		],
		page_size: amount
	});

	cache.set(id, response);

	return response;
};

const formatPost = async ({ id, properties }: BlogDatabase) => {
	const { tags, status, publishDate, excerpt, Name } = properties;

	// Fetch all the post properties separately (I know ridiculous, but there is no other way 🙂)
	const fetchedExcerpt = await getProperty(id, excerpt.id);
	const fetchedDate = await getProperty(id, publishDate.id);
	const fetchedStatus = await getProperty(id, status.id);
	const fetchedTags = await getProperty(id, tags.id);
	const fetcedTitle = await getProperty(id, Name.id);

	// Zod validators, data might be malformatted
	const formattedExcerpt = ResultRichText.parse(fetchedExcerpt).results[0].rich_text.plain_text;
	const formattedDate = DateProp.parse(fetchedDate).date.start;
	const formattedStatus = Select.parse(fetchedStatus).select.name;
	const formattedTags = MultiSelect.parse(fetchedTags).multi_select.map((tag) => tag.name);
	const formattedTitle = Title.parse(fetcedTitle).results[0].title.plain_text;

	return {
		id,
		tags: formattedTags,
		status: formattedStatus,
		publishDate: formattedDate,
		excerpt: formattedExcerpt,
		title: formattedTitle
	};
};

export const getBlogs = async (amount?: number) => {
	if (!BLOG_DATABASE_ID) throw new Error('No database ID!');

	const response = await getDatabase(BLOG_DATABASE_ID);

	const posts = response.results.map((result) => {
		const parsedResult = BlogDatabase.parse(result);

		const { id, cover, properties } = parsedResult;

		return {
			id,
			cover,
			properties
		};
	});

	const props = (await Promise.all(posts.map(async (post) => formatPost(post))))
		.filter((post) => post.status === 'Published')
		.slice(0, amount);

	return props;
};

export const getOneBLog = async (id: string) => {
	const { cover, properties } = (await client.pages.retrieve({ page_id: id })) as any;
	const response = await client.blocks.children.list({
		block_id: id
	});

	const validatedBlocks = BlogBlocks.parse(response.results);

	const blocks = validatedBlocks?.map((result) => {
		const rich_text =
			result.type !== 'image' &&
			result.type !== 'column_list' &&
			result[result.type]?.rich_text.map((component) => ({
				type: result.type,
				text: component.text,
				annotations: component.annotations
			}));

		return {
			type: result.type,
			rich_text,
			external: result.image?.external ?? result.image?.file
		};
	});

	const toFormat: BlogDatabase = { id, properties, cover };

	return { cover, properties: await formatPost(toFormat), blocks };
};
