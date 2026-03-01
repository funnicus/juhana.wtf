/**
 * Builds a safe JSON-LD script tag string.
 *
 * Angle brackets and ampersands inside the serialised JSON are replaced with
 * their Unicode escape equivalents so that a crafted value (e.g. a blog post
 * title containing a closing script sequence) can never break out of the tag.
 * The resulting string is valid JSON and interpreted identically by
 * JSON.parse, search engines, and AI crawlers.
 *
 * Keeping this logic in a plain .ts file means no Svelte / Prettier / ESLint
 * parser ever has to tokenise a literal script-tag sequence.
 */

function safeSerialize(data: Record<string, unknown>): string {
	return JSON.stringify(data)
		.replace(/</g, '\\u003C')
		.replace(/>/g, '\\u003E')
		.replace(/&/g, '\\u0026');
}

export function buildJsonLdTag(schema: Record<string, unknown>): string {
	const open = '<script type="application/ld+json">';
	const close = '</' + 'script>';
	return open + safeSerialize(schema) + close;
}
