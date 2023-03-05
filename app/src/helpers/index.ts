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

		const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
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
