export type ResolvedPost = {
	metadata: {
		title: string;
		description: string;
		date: string;
		author?: string;
		tags?: string[];
		image?: string;
	};
};

export type Post = {
	meta: {
		title: string;
		description: string;
		date: string;
		author?: string;
		tags?: string[];
		image?: string;
	};
	path: string;
};
