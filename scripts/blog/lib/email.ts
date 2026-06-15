import { ServerClient } from 'postmark';
import { hashToken } from '../../../src/lib/server/newsletter/tokens';
import type { CampaignPost } from './posts';
import type { CampaignConfig } from './config';

const escapeHtml = (value: string) =>
	value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');

export const renderCampaignEmail = ({
	post,
	siteUrl,
	unsubscribeToken
}: {
	post: CampaignPost;
	siteUrl: string;
	unsubscribeToken: string;
}) => {
	const postUrl = `${siteUrl}/blog/${post.slug}`;
	const unsubscribeUrl = `${siteUrl}/newsletter/unsubscribe?token=${encodeURIComponent(
		unsubscribeToken
	)}`;

	return {
		subject: post.title,
		text: [
			post.title,
			'',
			post.description,
			'',
			`Read the post: ${postUrl}`,
			'',
			`Unsubscribe: ${unsubscribeUrl}`
		].join('\n'),
		html: `<h1>${escapeHtml(post.title)}</h1>
<p>${escapeHtml(post.description)}</p>
<p><a href="${postUrl}">Read the post</a></p>
<p><a href="${unsubscribeUrl}">Unsubscribe</a></p>`
	};
};

export const sendCampaignEmail = async ({
	config,
	to,
	post,
	unsubscribeToken
}: {
	config: CampaignConfig;
	to: string;
	post: CampaignPost;
	unsubscribeToken: string;
}) => {
	const client = new ServerClient(config.postmarkServerToken);
	const email = renderCampaignEmail({
		post,
		siteUrl: config.siteUrl,
		unsubscribeToken
	});

	const response = await client.sendEmail({
		From: config.postmarkFromEmail,
		To: to,
		Subject: email.subject,
		TextBody: email.text,
		HtmlBody: email.html,
		MessageStream: config.postmarkBroadcastStream,
		Metadata: {
			post_slug: post.slug,
			post_theme: post.theme,
			unsubscribe_token_hash: hashToken(unsubscribeToken)
		}
	});

	return response.MessageID;
};
