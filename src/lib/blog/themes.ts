export const themes = [
	{
		slug: 'builder-notes',
		name: 'Builder Notes',
		description:
			'Practical engineering notes on code, architecture, infrastructure, tooling, debugging, and tradeoffs.',
		accent: 'border-blue-500',
		textAccent: 'text-blue-700',
		bgAccent: 'bg-blue-50'
	},
	{
		slug: 'from-agency-to-studio',
		name: 'From Agency to Studio',
		description:
			'Entrepreneurship from the inside: consulting lessons, client work, indie business, and the path toward owned creative products.',
		accent: 'border-emerald-500',
		textAccent: 'text-emerald-700',
		bgAccent: 'bg-emerald-50'
	},
	{
		slug: 'myth-meaning-direction',
		name: 'Myth, Meaning & Direction',
		description:
			'Intuitive essays on meaning, myth, technology, spirituality, and where human life may be heading.',
		accent: 'border-violet-500',
		textAccent: 'text-violet-700',
		bgAccent: 'bg-violet-50'
	},
	{
		slug: 'personal-operating-system',
		name: 'Personal Operating System',
		description:
			'Life systems for money, routines, health, goals, decisions, relationships, attention, habits, and personal infrastructure.',
		accent: 'border-amber-500',
		textAccent: 'text-amber-700',
		bgAccent: 'bg-amber-50'
	},
	{
		slug: 'creative-practice',
		name: 'Creative Practice',
		description:
			'Behind-the-scenes creative process: sketches, visual experiments, writing, game ideas, art workflows, taste, and iteration.',
		accent: 'border-rose-500',
		textAccent: 'text-rose-700',
		bgAccent: 'bg-rose-50'
	}
] as const;

export type Theme = (typeof themes)[number];
export type ThemeSlug = Theme['slug'];

export const themeSlugs = themes.map((theme) => theme.slug);

export const isThemeSlug = (value: string): value is ThemeSlug =>
	(themeSlugs as string[]).includes(value);

export const getTheme = (slug: string): Theme | undefined =>
	themes.find((theme) => theme.slug === slug);
