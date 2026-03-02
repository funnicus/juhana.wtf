const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const WORDS_PER_MINUTE = 200;

export const calcReadTime = (markdown: string): number => {
	const withoutFrontmatter = markdown.replace(/^---[\s\S]*?---/, '');
	const plainText = withoutFrontmatter
		.replace(/```[\s\S]*?```/g, '')
		.replace(/`[^`]+`/g, '')
		.replace(/!\[[^\]]*\]\([^)]*\)/g, '')
		.replace(/\[[^\]]*\]\([^)]*\)/g, '')
		.replace(/^#{1,6}\s+/gm, '')
		.replace(/[*_~]+/g, '')
		.replace(/<[^>]+>/g, '')
		.replace(/\s+/g, ' ')
		.trim();
	const wordCount = plainText.split(' ').filter(Boolean).length;
	return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
};

export const randomString = (n: number) =>
	Array(n)
		.join()
		.split(',')
		.map(function () {
			return alphabet.charAt(Math.floor(Math.random() * alphabet.length));
		})
		.join('');

export const useShuffleString = (str: string) => {
	const shuffle = () => {
		let iteration = 0;

		const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		const myName = 'Juhana Kuparinen';

		const interval = setInterval(() => {
			str = str
				.split('')
				.map((_: string, index: number) => {
					// Add space after 6th letter
					if (index === 6) return ' ';

					if (index < iteration) {
						return myName[index];
					}

					return letters[Math.floor(Math.random() * 26)];
				})
				.join('');

			if (iteration >= str.length) {
				clearInterval(interval);
			}

			iteration += 1 / 7;
		}, 10);

		return str;
	};

	return { str, shuffle };
};

export const useWave = () => {
	// Prevent spamming during animation
	let animating = false;

	// TODO: type this better
	const click = ({ target }: MouseEvent) => {
		if (!target || animating) return;
		(target as HTMLDivElement).classList.add('animate-wave');
		animating = true;
		setTimeout(() => {
			(target as HTMLDivElement).classList.remove('animate-wave');
			animating = false;
		}, 1000);
	};

	return { animating, click };
};
