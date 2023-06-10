const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

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
