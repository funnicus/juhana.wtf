export type Annotations = {
	bold: boolean;
	italic: boolean;
	strikethrough: boolean;
	underline: boolean;
	code: boolean;
	color: string;
};

export type Text = {
	content: string;
	link: { url: string } | null;
};

export type Type =
	| 'heading_1'
	| 'heading_2'
	| 'heading_3'
	| 'heading_4'
	| 'heading_5'
	| 'heading_6'
	| 'paragraph'
	| 'bold'
	| 'code';

export type Block = {
	type: Type;
	rich_text: {
		text: Text;
		annotations: Annotations;
	}[];
};
