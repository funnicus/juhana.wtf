import { z } from 'zod';

export const PropertyId = z.object({ id: z.string() });

export const BlogDatabase = z.object({
	id: z.string(),
	cover: z
		.object({
			external: z.object({
				url: z.string()
			})
		})
		.or(z.null()),
	properties: z.object({
		tags: PropertyId,
		status: PropertyId,
		publishDate: PropertyId,
		excerpt: PropertyId,
		Name: PropertyId
	})
});

const RichText = z.object({
	type: z.string(),
	text: z.object({
		content: z.string(),
		link: z.object({ url: z.string() }).or(z.null())
	}),
	plain_text: z.string(),
	annotations: z.object({
		bold: z.boolean().or(z.undefined()),
		italic: z.boolean().or(z.undefined()),
		striketrough: z.boolean().or(z.undefined()),
		underline: z.boolean().or(z.undefined()),
		code: z.boolean().or(z.undefined()),
		color: z.string().or(z.undefined())
	})
});

const Results = z.object({
	rich_text: RichText
});

export const ResultRichText = z.object({
	results: Results.array()
});

export const DateProp = z.object({
	date: z.object({ start: z.string() })
});

export const Select = z.object({
	select: z.object({ name: z.string() })
});

export const MultiSelect = z.object({
	multi_select: z.object({ name: z.string() }).array()
});

export const Title = z.object({
	results: z.object({ title: z.object({ plain_text: z.string() }) }).array()
});

const BlockType = z.object({
	rich_text: RichText.array()
});

export const BlogBlocks = z
	.object({
		type: z.enum([
			'heading_1',
			'heading_2',
			'heading_3',
			'heading_4',
			'heading_5',
			'heading_6',
			'paragraph',
			'column_list',
			'code',
			'image'
		]),
		paragraph: BlockType.or(z.undefined()),
		heading_1: BlockType.or(z.undefined()),
		heading_2: BlockType.or(z.undefined()),
		heading_3: BlockType.or(z.undefined()),
		heading_4: BlockType.or(z.undefined()),
		heading_5: BlockType.or(z.undefined()),
		heading_6: BlockType.or(z.undefined()),
		code: BlockType.or(z.undefined()),
		image: z
			.object({
				external: z.object({
					url: z.string().or(z.undefined())
				}),
				file: z.string().or(z.undefined())
			})
			.or(z.undefined())
	})
	.array()
	.or(z.undefined());

export type BlogDatabase = z.infer<typeof BlogDatabase>;

export type BlogBlocks = z.infer<typeof BlogBlocks>;
