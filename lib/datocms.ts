import { request } from 'graphql-request'

type HomepageData = {
	homePage: {
		pageTitle: string
		bigHeading: string
		smallHeading: string
		heroText: { value: {} }
		heroImage: {
			url: string
			alt: string
			width: number
			height: number
		}
	}
}

export const performRequest = async ({
	query,
	variables = {},
	includeDrafts = false,
}: {
	query: string
	variables?: {}
	includeDrafts?: boolean
}) => {
	const requestHeaders = {
		Authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
		...(includeDrafts ? { 'X-Include-Drafts': 'true' } : {}),
	}

	const response: HomepageData = await request(
		'https://graphql.datocms.com/',
		query,
		variables,
		requestHeaders
	)

	const responseBody = response

	if (!response) {
		throw new Error('No response from DatoCMS.')
	}

	return responseBody
}
