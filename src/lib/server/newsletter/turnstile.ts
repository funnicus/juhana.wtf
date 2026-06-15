const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

type TurnstileResponse = {
	success: boolean;
	'error-codes'?: string[];
};

export const verifyTurnstileToken = async ({
	secretKey,
	token,
	remoteIp
}: {
	secretKey: string;
	token: string;
	remoteIp?: string;
}) => {
	const body = new URLSearchParams({
		secret: secretKey,
		response: token
	});

	if (remoteIp) {
		body.set('remoteip', remoteIp);
	}

	const response = await fetch(TURNSTILE_VERIFY_URL, {
		method: 'POST',
		body
	});

	if (!response.ok) {
		return false;
	}

	const result = (await response.json()) as TurnstileResponse;

	return result.success === true;
};
