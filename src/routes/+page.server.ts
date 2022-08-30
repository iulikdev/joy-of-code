import type { PageServerLoad } from './$types'

import { getPosts } from '$root/lib/posts'

export const load: PageServerLoad = async ({ setHeaders }) => {
	const posts = await getPosts()

	// todo: cache control headers
	setHeaders({
		'Cache-Control': `public, max-age=${60 * 60}, s-maxage=${60 * 60}`,
	})

	return { posts }
}