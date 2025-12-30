export type ResolvedPost = {
	metadata: {
		title: string;
		description: string;
		date: string;
	};
};

export type Post = {
	meta: {
		title: string;
		description: string;
		date: string;
	};
	path: string;
};
