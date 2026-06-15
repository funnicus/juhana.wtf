import { ServerClient } from 'postmark';
import type { ThemeSlug } from '$lib/blog/themes';
import { getTheme } from '$lib/blog/themes';
import type { NewsletterConfig } from './config';

const escapeHtml = (value: string) =>
	value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');

const themeList = (themes: ThemeSlug[]) =>
	themes.map((themeSlug) => getTheme(themeSlug)?.name ?? themeSlug).join(', ');

export const sendConfirmationEmail = async ({
	config,
	email,
	confirmationToken,
	unsubscribeToken,
	themes
}: {
	config: NewsletterConfig;
	email: string;
	confirmationToken: string;
	unsubscribeToken?: string;
	themes: ThemeSlug[];
}) => {
	const confirmationUrl = `${config.siteUrl}/newsletter/confirm?token=${encodeURIComponent(
		confirmationToken
	)}`;
	const unsubscribeUrl = unsubscribeToken
		? `${config.siteUrl}/newsletter/unsubscribe?token=${encodeURIComponent(unsubscribeToken)}`
		: undefined;
	const selectedThemes = themeList(themes);
	const client = new ServerClient(config.postmarkServerToken);
	const textFooter = unsubscribeUrl
		? `If you did not request this, ignore this email or unsubscribe: ${unsubscribeUrl}`
		: 'If you did not request this, ignore this email.';
	const htmlFooter = unsubscribeUrl
		? `If you did not request this, ignore this email or <a href="${unsubscribeUrl}">unsubscribe</a>.`
		: 'If you did not request this, ignore this email.';

	await client.sendEmail({
		From: config.postmarkFromEmail,
		To: email,
		Subject: 'Confirm your juhana.wtf subscription',
		MessageStream: config.postmarkTransactionalStream,
		TextBody: [
			'Confirm your juhana.wtf subscription:',
			confirmationUrl,
			'',
			`Selected themes: ${selectedThemes}`,
			'',
			textFooter
		].join('\n'),
		HtmlBody: `<p>Confirm your juhana.wtf subscription:</p>
<p><a href="${confirmationUrl}">Confirm subscription</a></p>
<p>Selected themes: ${escapeHtml(selectedThemes)}</p>
<p>${htmlFooter}</p>`
	});
};
