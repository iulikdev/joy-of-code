import { json as json$1 } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit'

export const POST: RequestHandler = async ({ request }) => {
	const API_URL = 'https://api.buttondown.email/v1/subscribers'
	const API_KEY = process.env.BUTTONDOWN_API_KEY

	const email = await request.json()

	if (!email) {
		return json$1({ error: 'You forget the email. 😊' }, {
			status: 400
		})
	}

	try {
		const response = await fetch(API_URL, {
			method: 'post',
			body: JSON.stringify({ email }),
			headers: {
				Authorization: `Token ${API_KEY}`,
				'Content-Type': 'application/json',
			},
		})

		if (!response.ok) {
			const text = await response.text()

			if (text.includes('already subscribed')) {
				return json$1({ error: `You're already subscribed. 😊` }, {
					status: 400
				})
			}

			return json$1({ error: text }, {
				status: 400
			})
		}

		return json$1({ success: 'Thank you for subscribing! 🥳' }, {
			status: 201,
			headers: { location: '/' }
		})
	} catch (error) {
		if (error instanceof Error) {
			return json$1({ error: error.message })
		}
	}
}